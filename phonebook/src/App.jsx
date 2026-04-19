import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '', id: ''})
  const [filterTerm, setFilterTerm] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const isExist = persons.some(p => p.name === newPerson.name)
    if(isExist) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      phonebookService.addOne({name: newPerson.name, number: newPerson.number}).then(response => {
        setPersons(persons.concat(response.data))
      })
      setNewPerson({ name: '', number: '', id: '' })
    }
  }

  const inputChange = (event) => {
    setNewPerson({...newPerson, [event.target.name]:event.target.value})
  }


  const getFilter = (event) => {
    setFilterTerm(event.target.value)
  }

  useEffect(()=> {
    phonebookService.getAll().then(response => setPersons(response.data))
  }, [])

  const handleDelete = (id) => {
    if(window.confirm("Delete "+`${persons.find(p => p.id === id).name}` + " ?")){
      phonebookService.deleteOne(id).then(() => setPersons(persons.filter(p => p.id !== id)));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterTerm={filterTerm} getFilter={getFilter}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} inputChange={inputChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filterTerm={filterTerm} handleDelete={handleDelete}/>
    </div>
  )
}

export default App