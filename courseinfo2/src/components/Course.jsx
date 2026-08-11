const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

const Content = ({parts}) => {
  return (
    parts.map(item => <Part part={item} key={item.id}/>)
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, current) => {sum += current.exercises; return sum}, 0)
  return <p>total of {total} exercises</p>
}

const Course = ({course}) => {
  return (
    <>
      <Header header={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default Course;