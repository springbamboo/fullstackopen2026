import mongoose from 'mongoose';

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen2026_phonebook:${password}@cluster0.fkrzxgn.mongodb.net/?appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url, {family: 4});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log('saved!');
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.map((p) => console.log(p.name, p.number));
    mongoose.connection.close();
  });
}
