import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '', id: ''})
  const [filterTerm, setFilterTerm] = useState('')
  const [message, setmessage] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const existPerson = persons.find(p => p.name === newPerson.name)
    if(existPerson && existPerson.number == newPerson.number) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewPerson({ name: '', number: '', id: '' })
    } 
    if(!existPerson){
      phonebookService.addOne({name: newPerson.name, number: newPerson.number}).then(response => {
        setPersons(persons.concat(response.data))
        setmessage(`added ${newPerson.name}`)
        // setTimeout(()=>{setmessage(null)}, 3000);
      })
      setNewPerson({ name: '', number: '', id: '' })
    }
    if(existPerson && existPerson.number !== newPerson.number){
      alert(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      phonebookService.update(existPerson.id, newPerson).then((response) => {
        setPersons(persons.map(p => p.name === newPerson.name ? {...p, number: response.data.number}: p))
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
      {message ? <Notification message={message}/>: null}
      <Filter filterTerm={filterTerm} getFilter={getFilter}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} inputChange={inputChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filterTerm={filterTerm} handleDelete={handleDelete}/>
    </div>
  )
}

export default App