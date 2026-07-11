import * as logger from './logger.js';

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'});
};

const errorHandler = (error, request, response, next) => {
  response.status(404).send({error: error.message});
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  } else {
    request.token = null;
  }
  next();
};

export {requestLogger, unknownEndpoint, errorHandler, tokenExtractor};
