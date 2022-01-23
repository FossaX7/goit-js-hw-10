import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchCountries';
import {shortDescCountry} from './utils';
import {fullDescCountry} from './utils';


const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox : document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(evt) {
    evt.preventDefault();

    let searchCountryValue = refs.searchBox.value;

    if(searchCountryValue === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(searchCountryValue.trim())
    .then(countries => {
        if(countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = '';
            return;
        }
        if(countries.length >= 2 && countries.length <= 10) {
            const shortMarkup = countries.map(country => shortDescCountry(country));
            refs.countryList.innerHTML = shortMarkup.join(' ');
            refs.countryInfo.innerHTML = '';
        }
        if(countries.length === 1) {
            const fullMarkup = countries.map(country => fullDescCountry(country));
            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = fullMarkup.join(' ');
        }
    })
    .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return error;
    })
}