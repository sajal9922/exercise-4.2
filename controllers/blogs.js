const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.post('/', async (request, response, next) => {
  try {
    const token = getTokenFrom(request);
    if (!token) {
      return response.status(401).json({ error: 'Token missing' });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log('Decoded Token:', decodedToken);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token' });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }
    // Extract blog details from request body
    const { title, author, url, likes } = request.body;

    // Create a new blog instance
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id, // Assign the user ID to the blog's user field
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    // const blog = new Blog(request.body);
    // const result = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    console.error('Token verification error:', exception.message);
    return response.status(401).json({ error: 'Token invalid or expired' });
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id);
    if (!blog) {
      return response.status(404).end();
    }

    response.status(204).json(blog).end();
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
