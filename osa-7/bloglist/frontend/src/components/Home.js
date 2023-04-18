import { useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import Togglable from './Togglable';
import NewBlog from './NewBlog';
import BlogListItem from './BlogListItem';

import { getBlogs, createBlog } from '../requests';

const Home = ({ notifyWith }) => {
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  });

  const blogFormRef = useRef();

  const result = useQuery('blogs', getBlogs);

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const blogs = result.data;

  const addBlog = async newBlog => {
    newBlogMutation.mutate({ newBlog });
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    blogFormRef.current.toggleVisibility();
  };

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog createBlog={addBlog} />
      </Togglable>
      <div>
        {blogs.sort(byLikes).map(blog => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default Home;
