import express from 'express';
import Blog from '../modules/blog.js';

const blogRouter = express.Router();

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post('/', (request, response) => {
  const blog = new Blog({...request.body, likes: request.body.likes ?? 0});

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

export default blogRouter;
