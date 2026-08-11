import country from '../service/country';
import weather from '../service/weather';

import { useState, useEffect } from 'react';

function CountryDetail({ name }) {
    const [countryDetailInfo, setCountryDetailInfo] = useState(null);
    const [weatherInfo, setWeatherInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await country.getByName(name.toLowerCase());
                setCountryDetailInfo(res1);
                const lat = res1.capitalInfo.latlng[0];
                const lon = res1.capitalInfo.latlng[1];
                const res2 = await weather.getByLocation(lat, lon);
                setWeatherInfo(res2);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [name]);

    if (!countryDetailInfo || !weatherInfo) {
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
            <img src={`${countryDetailInfo.flags.png}`} />
            <h1>weather in {countryDetailInfo.capital}</h1>
            <p>Temperature {weatherInfo.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} />
            <p>wind {weatherInfo.wind.speed} m/s</p>
        </div>
    );
}

export default CountryDetail;
