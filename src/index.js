import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';


const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector("input#search-box");
const ulListRef = document.querySelector(".country-list");
const InfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input',debounce(onInputRef,DEBOUNCE_DELAY));

function onInputRef(e) {
    e.preventDefault();
    searchInput = e.target.value.trim(); 
    if (searchInput === "" || searchInput === undefined) { listReseter() //перевірка для порожноього поч,значення поля(без 
                                                                            // не всі очистки полів працюють вірно)
    } else {
    fetchCountries(searchInput)
    .then(onFetchName)
    .catch(onFetcherror)}
    //.finally(() => myFunction()) не працює
   }
/* //функція очистки 2
function myFunction() {
    document.getElementById("search-box").reset();
} */


//функція перевірки результату виклику  
 function onFetchName(response) {
    if (response.length === 1) {        //якщо в рез,знайдено 1 країну виконається функція
        renderCountryList(response);       //створення повного списку інформації 

    } if (response.length >= 2 && response.length <= 10) {      //якщо в рез,знайдено від 2 до 10 країн виконається функція
        renderCountrySmallList(response);                       //створення малого списку інформації

    } if(response.length > 10) {            //якщо в рез,знайдено більше 10 країн виконається функція
        fullList()                          //що виведе повідомлення -Too many matches found.
    }}
//функція повернення повідомлення про невдачу  
function onFetcherror(error){
    listReseter();
    return Notify.failure('Oops, there is no country with that name')
} 

 //функція створення малої інформкартки країни яка вбудовується в html та спрацьовує при введенні інф, в інпут 
function renderCountrySmallList(response) {
    listReseter();
    const mapRef = response.map(({flags, name}) => {
        return `<li>
                <img src="${flags.svg}" alt="${name}" width="40" height="20" /> 
                <p>${name.official}</p>
                </li>`;
        })
        .join('');
      
 return InfoRef.insertAdjacentHTML('beforeend', mapRef);
}

//функція створення повної інформкартки країни яка вбудовується в html та спрацьовує при введенні інф, в інпут 
 function renderCountryList(response) {
    listReseter();
    const cardsMarcup = response.map(({name,capital,population,flags,languages}) => {
        return `<li>
            <img src="${flags.svg}" alt="${name}" width="320" height="auto">
            <p><b>Name</b>: ${name.official}</p>
            <p><b>Capital</b>: ${capital}</p>
            <p><b>Population</b>: ${population}</p>
            <p><b>Languages</b>: ${Object.values(languages)}</p>
         </li>`;
      })
      .join('');
      InfoRef.insertAdjacentHTML('beforeend',cardsMarcup);
  } 
   //функція очистки елементів
   function listReseter() {
    InfoRef.innerHTML = '', ulListRef.innerHTML = '';
  } 

  //функція що виводить повідомлення про завеликий список знайденого
  function fullList() {
    listReseter()
    return Notify.info('Too many matches found. Please, enter a more specific name.');
    }   

  