const Filter = ({filterTerm, getFilter}) => {
    return (
        <div>
            filter shown with <input value={filterTerm} onChange={getFilter}/>
        </div>
    )
}

export default Filter;