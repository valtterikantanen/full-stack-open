import blogService from './services/blogs';
import userService from './services/user';

export const getBlogs = () => blogService.getAll(res => res.data);

export const createBlog = ({ newBlog }) => blogService.create(newBlog);

export const updateBlog = updatedBlog => blogService.update(updatedBlog);

export const deleteBlog = id => blogService.remove(id);

export const getUsers = () => userService.getAll(res => res.data);
