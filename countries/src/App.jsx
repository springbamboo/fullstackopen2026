import { useEffect, useState } from "react";
import country from "./service/country";

function CountryDetail({name}) {
  const [countryDetailInfo, setCountryDetailInfo] = useState(null);

  useEffect(() => {
    country.getByName(name.toLowerCase()).then(res => {
      setCountryDetailInfo(res)
      console.log(res)
    })
  },[name])

if (!countryDetailInfo) {
  return <div>Loading data...</div>; 
}


return (
  <div>
    <h1>{countryDetailInfo.name.common}</h1>
    <p>Capital {countryDetailInfo.capital[0]}</p>
    <p>area {countryDetailInfo.area}</p>
    <h1>Languages</h1>
    <ul>
        {Object.values(countryDetailInfo.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
    <img src={`${countryDetailInfo.flags.png}`}/>
  </div>
);
}

function CountryList({resultList}) {
  if (resultList.length > 10) return (<p>Too many matches, specify another filter</p>)
  if (resultList.length === 0) return (<p>no matches</p>)
  if (resultList.length === 1) return (<CountryDetail name={resultList[0]}/>)
  if (resultList.length <= 10 && resultList.length > 1) 
    return resultList.map(name => (
      <div key={name}>{name}</div>
    ))
}

function App() {
    const [countryNameList, setCountryNameList] = useState([]);
    const [searchWord, setSearchWord] = useState('');

    const resultList = countryNameList.filter(name => name.toLowerCase().includes(searchWord.toLowerCase()))

    useEffect(()=>{
      country.getAll().then(res => {
        const names = res.map(e => e.name.common);
        setCountryNameList(names)
      })
    }, [])
    
      return (
          <div>
              find countries <input value={searchWord} onChange={(e) => {setSearchWord(e.target.value)}}/>
              <CountryList resultList={resultList}/>
          </div>
      )
}

export default App
