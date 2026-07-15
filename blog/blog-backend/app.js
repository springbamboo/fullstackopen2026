import express from 'express';
import mongoose from 'mongoose';
import * as config from './utils/config.js';
import * as logger from './utils/logger.js';
import * as middleware from './utils/middleware.js';
import blogRouter from './controllers/blog.js';
import userRouter from './controllers/user.js';
import loginRouter from './controllers/login.js';

const app = express();

mongoose
  .connect(config.MONGO_URI, {family: 4})
  .then(() => {
    logger.info('connected to the mongodb');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB', error.message);
  });

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
