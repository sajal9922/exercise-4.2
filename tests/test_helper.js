const Blog = require('../models/blog');

// Define two initial blogs
const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'https://blog1.com',
    likes: 10,
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'https://blog2.com',
    likes: 5,
  },
];

// Retrieve blogs from the database
const blogsInDb = async () => {
  try {
    const blogs = await Blog.find();
    console.log('Blogs retrieved from the database:', blogs);
    return blogs;
  } catch (error) {
    console.error('Error retrieving blogs from the database:', error);
    return [];
  }
};
module.exports = { initialBlogs, blogsInDb };
