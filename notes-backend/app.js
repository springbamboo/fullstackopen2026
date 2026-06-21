import express from 'express';
import mongoose from 'mongoose';
import * as config from './utils/config.js';
import * as logger from './utils/logger.js';
import * as middleware from './utils/middleware.js';
import {notesRouter} from './controllers/notes.js';
import {usersRouter} from './controllers/users.js';
import {loginRouter} from './controllers/login.js';

const app = express();

mongoose
  .connect(config.MONGODB_URI, {family: 4})
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB', error.message);
  });

app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
