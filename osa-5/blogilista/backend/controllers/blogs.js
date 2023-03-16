const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { tokenExtractor, userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  res.json(blogs);
});

blogsRouter.post('/', tokenExtractor, userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;
  const user = req.user;

  if (title === undefined || url === undefined) {
    return res.status(400).end();
  }
  const blog = new Blog({ title, author, url, likes: likes ?? 0, user });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (req, res) => {
  const blogToBeRemoved = await Blog.findById(req.params.id);
  const user = req.user;

  if (blogToBeRemoved === null) {
    return res.status(404).end();
  }
  if (blogToBeRemoved.user.toString() !== user._id.toString()) {
    return res.status(401).end();
  }

  await Blog.deleteOne({ _id: req.params.id });
  res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
  await updatedBlog.populate('user', { username: 1, name: 1, id: 1 });

  res.json(updatedBlog);
});

module.exports = blogsRouter;
