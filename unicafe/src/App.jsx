import { useState } from 'react'


const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  
  if(all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  const average = all > 0 ? (good - bad) / all:0;
  
  const positive = all >0 ? good * 100 / all +  " %" : 0;

  return (
  <div>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {all}</p>
    <p>average {average}</p>
    <p>positive {positive}</p>
  </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {setGood(good + 1)}
  const handleNeutralClick = () => {setNeutral(neutral + 1)}
  const handlebadClick = () => {setBad(bad + 1)}
  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handlebadClick}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App