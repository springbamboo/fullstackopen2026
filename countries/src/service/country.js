const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/';

async function getAll() {
    const endpoint = 'api/all';
    const res = await fetch(baseUrl + endpoint);
    return res.json();
}

async function getByName(name) {
    const endpoint = `api/name/${name}`;
    const res = await fetch(baseUrl + endpoint);
    return res.json();
}

export default { getAll, getByName };
