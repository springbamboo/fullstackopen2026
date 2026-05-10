import express from 'express'
import morgan from 'morgan'
import Person from './modules/phonebook.js'

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
)

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.find({ _id: request.params.id })
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    const error = new Error('name is missing')
    error.name = 'ValidationError'
    return next(error)
  }

  if (!body.number) {
    const error = new Error('number is missing')
    error.name = 'ValidationError'
    return next(error)
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson
    .save()
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  Person.updateOne(
    { _id: request.params.id },
    { $set: { number: request.body.number } },
    { runValidators: true },
  )
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
