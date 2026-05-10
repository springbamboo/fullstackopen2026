import mongoose from 'mongoose'
import 'dotenv/config'

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 8 },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)

export default Person
