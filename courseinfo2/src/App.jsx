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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    courses.map((item) => <Course course={item} key={item.id}/>)
  )
}

export default App