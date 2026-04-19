import { useState } from 'react'

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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterTerm} onChange={getFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input name="name" value={newPerson.name} onChange={inputChange}/>
        </div>
        <div>number: <input name="number" value={newPerson.number} onChange={inputChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => (person.name.toLowerCase().includes(filterTerm.toLowerCase()))).map(person => (
          <li key = {person.name}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App