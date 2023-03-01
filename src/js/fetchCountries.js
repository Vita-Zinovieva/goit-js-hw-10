
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const Fields_Name = 'name,capital,population,flags,languages';
// стрічка яка додає фільтрацію поля по парметрах в URL адресі 
//const param = new URLcountry({fields: 'name,capital,population,flags,languages,'});
export const fetchCountries = (name) => {
return fetch(`${BASE_URL}${name}?fields=${Fields_Name}`)
.then(response => {
    if (!response.ok) {
        throw new Error(response.status);
        }
    return response.json();
    
  })
} 

