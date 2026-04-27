import { useState } from 'react';
import CountryDetail from './CountryDetail';

function CountryList({ resultList }) {
    const [selectedCountry, setSelectedCountry] = useState(null);

    if (resultList.length > 10) return <p>Too many matches, specify another filter</p>;
    if (resultList.length === 0) return <p>no matches</p>;
    if (resultList.length === 1) return <CountryDetail name={resultList[0]} />;
    if (resultList.length <= 10 && resultList.length > 1)
        return (
            <div>
                {resultList.map(name => (
                    <div key={name}>
                        {name} <button onClick={() => setSelectedCountry(name)}>Show</button>
                    </div>
                ))}

                {selectedCountry && (
                    <div>
                        <h2>Details for {selectedCountry}</h2>
                        <CountryDetail name={selectedCountry} />
                    </div>
                )}
            </div>
        );
}

export default CountryList;
