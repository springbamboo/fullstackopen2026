import express from 'express';
import Blog from '../modules/blog.js';

const blogRouter = express.Router();

blogRouter.get('/', async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({});
    return response.status(200).json(allBlogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog({...request.body, likes: request.body.likes ?? 0});

  if (!(request.body.title && request.body.url)) {
    return response.status(400).json({error: 'title and url are required'});
  }

  try {
    blog.save().then((result) => {
      response.status(201).json(result);
    });
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  const blogID = request.params.id;
  try {
    await Blog.findByIdAndDelete(blogID);
    return response.status(204).end();
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
