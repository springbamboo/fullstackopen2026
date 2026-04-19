import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '39-44-12345'}
  ])
  const [newPerson, setNewPerson] = useState({ name: '', number: ''})
  const [filterTerm, setFilterTerm] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const isExist = persons.some(p => p.name === newPerson.name)
    if(isExist) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newPerson.name, number: newPerson.number}))
      setNewPerson({ name: '', number: '' })
    }
  }

  const inputChange = (event) => {
    setNewPerson({...newPerson, [event.target.name]:event.target.value})
  }


  const getFilter = (event) => {
    setFilterTerm(event.target.value)
  }

  useEffect(()=> {
    axios.get("http://localhost:3001/persons").then(response => setPersons(response.data))
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterTerm={filterTerm} getFilter={getFilter}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} inputChange={inputChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filterTerm={filterTerm}/>
    </div>
  )
}

export default App