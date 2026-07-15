import express from 'express';
import jwt from 'jsonwebtoken';

import Blog from '../modules/blog.js';
import User from '../modules/user.js';

import {userExtractor} from '../utils/middleware.js';

const blogRouter = express.Router();

blogRouter.get('/', async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });
    return response.status(200).json(allBlogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body;
  if (!(request.body.title && request.body.url)) {
    return response.status(400).json({error: 'title and url are required'});
  }
  const user = request.user;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: user._id,
  });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  return response.status(201).json(result);
});

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const user = request.user;
  const blogID = request.params.id;
  const blogAuthor = await Blog.findById(blogID);
  if (blogAuthor.user.toString() === user.id) {
    await Blog.findByIdAndDelete(blogID);
    return response.status(204).end();
  } else {
    return response.status(401).json({error: 'token invalid'});
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const blogID = request.params.id;
  const body = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogID, body, {
      returnDocument: 'after',
    });

    if (updatedBlog) {
      response.status(200).json(updatedBlog);
    } else {
      response.status(404).json({error: 'blog not found'});
    }
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
