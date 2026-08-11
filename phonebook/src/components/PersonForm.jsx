const PersonForm = ({addPerson, newPerson, inputChange}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input name="name" value={newPerson.name} onChange={inputChange}/>
        </div>
        <div>number: <input name="number" value={newPerson.number} onChange={inputChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm;