const Persons = ({persons, filterTerm, handleDelete}) => {
    return (
    <ul>
        {persons.filter(person => (person.name.toLowerCase().includes(filterTerm.toLowerCase()))).map(person => (
          <li key = {person.id}>{person.name} {person.number} <button onClick={()=>{handleDelete(person.id)}}>delete</button></li>
        ))}
    </ul>
    )
}

export default Persons;