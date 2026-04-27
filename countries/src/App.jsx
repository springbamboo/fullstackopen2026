import { useEffect, useState } from 'react';
import country from './service/country';
import CountryList from './components/CountryList';

function App() {
    const [countryNameList, setCountryNameList] = useState([]);
    const [searchWord, setSearchWord] = useState('');

    const resultList = countryNameList.filter(name =>
        name.toLowerCase().includes(searchWord.toLowerCase())
    );

    useEffect(() => {
        country.getAll().then(res => {
            const names = res.map(e => e.name.common);
            setCountryNameList(names);
        });
    }, []);

    return (
        <div>
            find countries{' '}
            <input
                value={searchWord}
                onChange={e => {
                    setSearchWord(e.target.value);
                }}
            />
            <CountryList key={searchWord} resultList={resultList} />
        </div>
    );
}

export default App;
