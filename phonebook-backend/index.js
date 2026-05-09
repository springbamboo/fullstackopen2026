import express from 'express';
import morgan from 'morgan';
import Person from './modules/phonebook.js';

const app = express();

app.use(express.static('dist'));
app.use(express.json());

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message});
  }
  next(error);
};

app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get('/info', (request, response) => {
  const date = new Date();
  const content = `
    <p>Phonebook has info for ${phoneBookList.length} people</p>
    <p>${date}</p>
  `;

  response.send(content);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = phoneBookList.find((item) => item.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  phoneBookList = phoneBookList.filter((item) => item.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;
  if (!body.name) {
    const error = new Error('name is missing');
    error.name = 'ValidationError';
    return next(error);
  }

  if (!body.number) {
    const error = new Error('number is missing');
    error.name = 'ValidationError';
    return next(error);
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then((result) => {
    response.json(result);
  });
});

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
