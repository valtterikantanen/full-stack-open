import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import UserContext from '../UserContext';

import { getBlogs, updateBlog, deleteBlog } from '../requests';
import blogService from '../services/blogs';

const Blog = ({ notifyWith }) => {
  const [newComment, setNewComment] = useState('');
  const id = useParams().id;
  const user = useContext(UserContext);

  const queryClient = useQueryClient();

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  });

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  });

  const result = useQuery('blogs', getBlogs);

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }
  const blog = result.data.find(blog => blog.id === id);

  if (blog === undefined) return null;

  const like = blog => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    notifyWith(`A like for the blog '${blog.title}' by ${blog.author}`);
  };

  const remove = async blog => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`);
    if (ok) {
      deleteBlogMutation.mutate(blog.id);
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
    }
  };

  const submitComment = async e => {
    e.preventDefault();
    const savedComment = await blogService.addComment(blog.id, newComment);
    setNewComment('');
    blog.comments = [...blog.comments, savedComment];
  };

  const canRemove = () => user && blog.user.username === user.username;

  return (
    <>
      <h2>
        <em>{blog.title}</em> ({blog.author})
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={like}>like</button>
      </div>
      <div>added by {blog.user && blog.user.name}</div>
      {canRemove() && <button onClick={remove}>delete</button>}
      <h3>comments</h3>
      <form onSubmit={submitComment}>
        <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment.id}>{comment.message}</li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
