const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { error } = require('../utils/logger');

blogRouter.get('/', (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch(next);
});

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch(next);
});

module.exports = blogRouter;
