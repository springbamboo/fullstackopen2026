import supertest from 'supertest';
import app from '../app.js';
import test, {after, before, describe} from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import User from '../modules/user.js';

before(async () => {
  await User.deleteMany({});
});

describe('user api test', () => {
  test('password less then 3', async () => {
    const response = await supertest(app)
      .post('/api/users')
      .send({
        name: 'abcabc',
        username: 'abcabc',
        password: '12',
      })
      .expect(400);
    assert.equal(
      response.body.error,
      'the length of password should be more than 3',
    );
  });
  test('without name,username,password', async () => {
    const response = await supertest(app)
      .post('/api/users')
      .send({
        name: 'abcabc',
        password: '1233',
      })
      .expect(400);
    assert.equal(response.body.error, 'name,username,password are required');
  });
});

after(() => {
  mongoose.connection.close();
});
