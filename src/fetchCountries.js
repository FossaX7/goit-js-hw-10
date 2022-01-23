export function fetchCountries(name) {
    const URL = 'https://restcountries.com/v3.1/name/';
    const filters = '?fields=name,capital,population,flags,languages';

    console.log(name);
    return fetch(`${URL}${name}${filters}`)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}