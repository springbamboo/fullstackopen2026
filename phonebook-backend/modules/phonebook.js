import mongoose from 'mongoose';
import 'dotenv/config';

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url, {family: 4});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

export default Person;
