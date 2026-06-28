import supertest from 'supertest';
import {test, beforeEach, after, before} from 'node:test';
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

after(async () => {
  await mongoose.connection.close();
});
