import express from 'express';
import jwt from 'jsonwebtoken';

import Blog from '../modules/blog.js';
import User from '../modules/user.js';

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

blogRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token invalid'});
  }

  if (!(request.body.title && request.body.url)) {
    return response.status(400).json({error: 'title and url are required'});
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({error: 'UserId missing or not valid'});
  }
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

blogRouter.delete('/:id', async (request, response, next) => {
  const blogID = request.params.id;
  try {
    const blogInfo = await Blog.findById(blogID);
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (blogInfo.user.toString() === decodedToken.id) {
      await Blog.findByIdAndDelete(blogID);
      return response.status(204).end();
    } else {
      return response.status(401).json({error: 'token invalid'});
    }
  } catch (error) {
    next(error);
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
