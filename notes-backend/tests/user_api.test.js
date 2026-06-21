import bcrypt from 'bcrypt';
import {User} from '../modules/user.js';
import {test, beforeEach, describe, after} from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import {usersInDb} from './test_helper.js';

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({username: 'root', passwordHash});

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
