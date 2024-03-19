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

  test('Returns correct amount of blogs in JSON format', async () => {
    await Blog.insertMany(initialBlogs);

    const response = await api.get('/api/blogs');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(initialBlogs.length);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    // expect(response.body[0].title).toBe(initialBlogs[0].title);
    // expect(response.body[1].title).toBe(initialBlogs[1].title);
  });

  test('Creates a new blog,amount of blog 1 and content in JSON formate', async () => {
    // await Blog.insertMany(initialBlogs);
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'https://newblog.com',
      likes: 0,
    };

    const response = await api.post('/api/blogs').send(newBlog);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(1);
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });
  test('Post a new blog post, number of blog increased by one and content saved in JSON formate', async () => {
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
// test delete a blog by id
test('Deletes a blog by Id, number of blog reduce by 1 and blog with same id does not found', async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
  const id = blogsAtEnd.map((blog) => blog.id);
  expect(id).not.toContain(blogToDelete.id);
});
afterAll(async () => {
  await mongoose.connection.close();
});
