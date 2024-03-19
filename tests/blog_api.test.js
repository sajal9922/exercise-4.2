const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const mongoose = require('mongoose');

const { initialBlogs, blogsInDb } = require('./test_helper');
describe('Blog API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  });

  test('GET /api/blogs returns all blogs', async () => {
    await Blog.insertMany(initialBlogs);

    const response = await api.get('/api/blogs');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(initialBlogs.length);
    expect(response.body[0].title).toBe(initialBlogs[0].title);
    expect(response.body[1].title).toBe(initialBlogs[1].title);
  });

  test('POST /api/blogs creates a new blog', async () => {
    // await Blog.insertMany(initialBlogs);
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'https://newblog.com',
      likes: 0,
    };

    const response = await api.post('/api/blogs').send(newBlog);
    const blogsAtEnd = await blogsInDb();

    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });
  test('POST /api/blogs creates a new blog', async () => {
    await Blog.insertMany(initialBlogs);
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'https://newblog.com',
      likes: 0,
    };

    const response = await api.post('/api/blogs').send(newBlog);
    const blogsAtEnd = await blogsInDb();

    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
