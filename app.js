const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const morgan = require('morgan');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const Blog = require('./models/blog');

require('dotenv').config();

const mongoUrl = config.MONGODB_URI;
logger.info('Connicg to the database....');

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('connected to database');
  })
  .catch((error) => {
    logger.error('error connecting to database', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use(middleware.errorHandler);
app.use(middleware.requestLogger);
app.use(middleware.unkownEndppoint);

module.exports = app;
