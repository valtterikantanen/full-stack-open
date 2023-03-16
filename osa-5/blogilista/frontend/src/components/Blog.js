import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleAddLike, handleBlogRemove }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    padding: '10px 0 0 2px',
    border: '1px solid black',
    marginBottom: '5px'
  };

  const removeBtnStyle = {
    backgroundColor: '#DD0F23',
    color: 'white',
    padding: '5px 10px',
    margin: '5px',
    border: 'none',
    borderRadius: '0.5em',
    cursor: 'pointer'
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = () => {
    handleAddLike(blog);
  };

  const deleteBlog = () => {
    handleBlogRemove(blog);
  };

  const hasAddedTheBlog = () => {
    const loggedUser = JSON.parse(window.localStorage.getItem('BLOGLIST-APP-USER'));
    return loggedUser?.username === blog.user.username;
  };

  const basicInfo = () => (
    <div>
      <span id="blogTitle">{blog.title}</span>&nbsp;
      <span id="blogAuthor">{blog.author}</span>
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
    </div>
  );

  if (!visible) {
    return (
      <div className="blog-info" style={blogStyle}>
        {basicInfo()}
      </div>
    );
  }

  return (
    <div className="blog-info" style={blogStyle}>
      {basicInfo()}
      <a href={blog.url}>{blog.url}</a>
      <div id="blogLikes">
        likes {blog.likes} <button onClick={addLike}>like</button>
      </div>
      <div id="blogAddedByUser">{blog.user.name}</div>
      <div>
        {hasAddedTheBlog() && (
          <button style={removeBtnStyle} onClick={deleteBlog}>
            delete
          </button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleAddLike: PropTypes.func.isRequired,
  handleBlogRemove: PropTypes.func.isRequired
};

export default Blog;
