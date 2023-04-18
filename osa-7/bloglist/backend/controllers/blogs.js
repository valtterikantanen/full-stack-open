const router = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');

const { userExtractor } = require('../utils/middleware');

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { id: 1, message: 1 });

  res.json(blogs);
});

router.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
    comments: []
  });

  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'operation not permitted' });
  }

  blog.user = user._id;

  let createdBlog = await blog.save();

  user.blogs = user.blogs.concat(createdBlog._id);
  await user.save();

  createdBlog = await Blog.findById(createdBlog._id).populate('user');

  res.status(201).json(createdBlog);
});

router.put('/:id', async (req, res) => {
  const { title, url, author, likes } = req.body;

  let updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, url, author, likes },
    { new: true }
  );

  updatedBlog = await Blog.findById(updatedBlog._id).populate('user');

  res.json(updatedBlog);
});

router.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  const user = req.user;

  if (!user || blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'operation not permitted' });
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString());

  await user.save();
  await blog.remove();

  res.status(204).end();
});

router.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  const comment = new Comment({
    message: req.body.comment
  });

  comment.blog = blog._id;

  let savedComment = await comment.save();

  blog.comments = blog.comments.concat(savedComment);
  await blog.save();

  res.status(201).json(savedComment);
});

module.exports = router;
