import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const isExist = persons.some(p => p.name === newName)
    if(isExist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName}))
    }
  }

  const inputChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={inputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key = {person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App