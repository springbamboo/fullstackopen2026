const Persons = ({persons, filterTerm}) => {
    return (
    <ul>
        {persons.filter(person => (person.name.toLowerCase().includes(filterTerm.toLowerCase()))).map(person => (
          <li key = {person.name}>{person.name} {person.number}</li>
        ))}
    </ul>
    )
}

export default Persons;