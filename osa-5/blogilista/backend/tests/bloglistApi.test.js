const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const { initialBlogs, blogsInDb } = require('./testHelper');

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = new User({
    username: 'testuser',
    password: 'secret',
    name: 'Test User'
  });

  const savedUser = await user.save();

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id
  };

  token = `Bearer ${jwt.sign(userForToken, process.env.SECRET)}`;

  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog);
    blogObject.user = savedUser._id;
    await blogObject.save();
  }
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are initially two blogs', async () => {
  const res = await api.get('/api/blogs');

  expect(res.body).toHaveLength(2);
});

test('blogs are identified with a field called id', async () => {
  const res = await api.get('/api/blogs');
  const firstBlog = res.body[0];

  expect(firstBlog.id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const res = await api.get('/api/blogs');
  const titles = res.body.map(blog => blog.title);

  expect(res.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain('React patterns');
});

test('if `likes` property is undefined, it will be set to 0', async () => {
  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  };

  const res = await api.post('/api/blogs').set('Authorization', token).send(newBlog);

  expect(res.body.likes).toBe(0);
});

test('if new blog does not contain title, status code 400 is returned', async () => {
  const newBlog = {
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  };

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400);
});

test('if new blog does not contain url, status code 400 is returned', async () => {
  const newBlog = {
    author: 'Michael Chan',
    title: 'React patterns'
  };

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400);
});

test('deletion of a blog succeeds with status code 204 if id is valid and a valid token is sent', async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', token)
    .expect(204);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

  const titles = blogsAtEnd.map(blog => blog.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test('deletion of a blog fails with status code 401 if id is valid but no valid token was sent', async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(401);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});

test('updating of a blog succeeds if id is valid', async () => {
  const blogsAtStart = await blogsInDb();
  const blogBeforeUpdate = blogsAtStart[0];
  const blogToUpdate = { ...blogBeforeUpdate, likes: blogBeforeUpdate.likes + 1 };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate);

  expect(response.body.likes).toBe(blogBeforeUpdate.likes + 1);
});

describe('when creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('username must be unique', async () => {
    const firstUser = {
      username: 'root',
      name: 'Mikko Mallikas',
      password: 'secret123'
    };

    await api
      .post('/api/users')
      .send(firstUser)
      .expect(201);

    const secondUser = {
      username: 'root',
      name: 'M. Mallikas',
      password: 'secret456'
    };

    const result = await api
      .post('/api/users')
      .send(secondUser)
      .expect(400);

    expect(result.body.error).toContain('expected `username` to be unique');

    const allUsers = await User.find({});
    expect(allUsers.length).toBe(1);
  });

  test('username must be at least 3 characters long', async () => {
    const user = {
      username: 'ab',
      name: 'Mikko Mallikas',
      password: 'secret123'
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(result.body.error).toContain('`username` (`ab`) is shorter than the minimum allowed length (3)');

    const allUsers = await User.find({});
    expect(allUsers.length).toBe(0);
  });

  test('password must be at least 3 characters long', async () => {
    const user = {
      username: 'root',
      name: 'Mikko Mallikas',
      password: '12'
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(result.body.error).toContain('Password must be at least 3 characters long');

    const allUsers = await User.find({});
    expect(allUsers.length).toBe(0);
  });

  test('user will not be created if password is undefined', async () => {
    const user = {
      username: 'root',
      name: 'Mikko Mallikas'
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(result.body.error).toContain('Password must be at least 3 characters long');

    const allUsers = await User.find({});
    expect(allUsers.length).toBe(0);
  });
});

afterAll(async() => {
  await mongoose.connection.close();
});