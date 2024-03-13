const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl =
  'mongodb+srv://fullstack:A8QOFF0SW0dQy4Ig@cluster-demo.7tbn5u1.mongodb.net/blogListApp?retryWrites=true&w=majority&appName=Cluster-demo';
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to database');
  })
  .catch((error) => {
    console.error('error connecting to database');
  });

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
