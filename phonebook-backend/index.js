import express from 'express';

const app = express();

const phoneBookList = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];
app.get('/api/persons', (request, response) => {
  response.json(phoneBookList);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
