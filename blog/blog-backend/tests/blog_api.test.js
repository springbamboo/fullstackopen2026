import supertest from 'supertest';
import {test, beforeEach, after, before, describe} from 'node:test';
import assert from 'node:assert';
import * as helper from '../utils/list_helper.js';
import mongoose from 'mongoose';
import app from '../app.js';
import Blog from '../modules/blog.js';

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlog);
});

test('HTTP Get request to the /api/blogs', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  const blog = response.body[0];
  assert.ok(blog.id, 'id property should exist');
  assert.strictEqual(blog._id, undefined, '_id property should not exist');
});

test('the /api/blogs URL successfully creates a new blog post', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: "today's weather",
      author: 'john',
      url: 'www',
      likes: '0',
    })
    .expect(201);
  const blogInDb = await Blog.find({});
  assert.strictEqual(blogInDb.length, helper.initialBlog.length + 1);
  const blogTitles = blogInDb.map((blog) => blog.title);
  assert(blogTitles.includes("today's weather"));
});

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const response = await api
    .post('/api/blogs')
    .send({
      title: "today's weather2",
      author: 'john',
      url: 'www',
    })
    .expect(201);
  assert.equal(response.body.likes, 0);
});

describe('if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', () => {
  test('missing title', async () => {
    const newBlog = {
      author: 'Tester',
      url: 'http://test.com',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('missing url', async () => {
    const newBlog = {
      title: 'Missing URL Blog',
      author: 'Tester',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('missing title and url', async () => {
    const newBlog = {
      author: 'Tester',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

test('delete by id', async () => {
  const blogID = helper.initialBlog[0]._id;
  await api.delete(`/api/blogs/${blogID}`).send().expect(204);
});

after(async () => {
  await mongoose.connection.close();
});
