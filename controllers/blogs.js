const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const User = require('../models/user');

// blogRouter.get('/', (request, response, next) => {
//   Blog.find({})
//     .then((blogs) => {
//       response.json(blogs);
//     })
//     .catch(next);
// });

// blogRouter.post('/', (request, response, next) => {
//   const blog = new Blog(request.body);

//   blog
//     .save()
//     .then((result) => {
//       response.status(201).json(result);
//     })
//     .catch(next);
// });
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

blogRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;
    const user = await User.findById(body.userId);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    // const blog = new Blog(request.body);
    // const result = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
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
