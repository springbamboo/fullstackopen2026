const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getByLocation(lat, lon) {
    const endPoint = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const res = await fetch(baseUrl + '?' + endPoint);
    return res.json();
}

export default { getByLocation };
