import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const newBlogFormRef = useRef();

  const sortBlogsByLikesDesc = (a, b) => b.likes - a.likes;

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs.sort(sortBlogsByLikesDesc));
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('BLOGLIST-APP-USER');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const Notification = ({ notification }) => {
    if (notification === null) return null;
    const { message, type } = notification;
    return <div className={`notification ${type}`}>{message}</div>;
  };

  const displayNotification = message => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('BLOGLIST-APP-USER');
  };

  const handleLogin = async userObject => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem('BLOGLIST-APP-USER', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      displayNotification({ message: 'wrong username or password', type: 'error' });
    }
  };

  const handleCreateBlog = async blogObject => {
    try {
      const newBlog = await blogService.create(blogObject);
      displayNotification({
        message: `A new blog “${blogObject.title}” by ${blogObject.author} added`,
        type: 'success'
      });
      setBlogs(prevBlogs => [...prevBlogs, newBlog]);
      newBlogFormRef.current.toggleVisibility();
    } catch (exception) {
      displayNotification({
        message: 'There was an error adding the blog, please try again later.',
        type: 'error'
      });
    }
  };

  const handleAddLike = async blog => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.update(updatedBlog);
    const allBlogs = blogs.map(b => (b.id === blog.id ? returnedBlog : b));
    setBlogs(allBlogs.sort(sortBlogsByLikesDesc));
  };

  const handleBlogRemove = async blog => {
    if (!window.confirm(`Remove blog “${blog.title}” by ${blog.author}?`)) return;
    await blogService.remove(blog.id);
    setBlogs(blogs.filter(b => b.id !== blog.id));
  };

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm logUserIn={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
        <NewBlogForm createNewBlog={handleCreateBlog} />
      </Togglable>
      <br />
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleAddLike={handleAddLike}
          handleBlogRemove={handleBlogRemove}
        />
      ))}
    </div>
  );
};

export default App;
