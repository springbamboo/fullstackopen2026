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

  if (!(request.body.title && request.body.url)) {
    return response.status(400).json({error: 'title and url are required'});
  }

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogRouter.delete('/:id', async (request, response) => {
  const blogID = request.params.id;
  await Blog.findByIdAndDelete(blogID);
  return response.status(204).end();
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
