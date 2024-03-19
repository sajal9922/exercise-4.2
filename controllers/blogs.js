const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

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
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
