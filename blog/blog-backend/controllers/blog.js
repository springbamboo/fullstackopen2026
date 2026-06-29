import express, {request} from 'express';
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
  console.log('blogID', blogID);
  await Blog.findByIdAndDelete(blogID);
  return response.status(204).end();
});

export default blogRouter;
