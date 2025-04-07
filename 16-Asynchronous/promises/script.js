'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (errorMessage) {
  countriesContainer.insertAdjacentText('beforeend', errorMessage);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className) {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
// Lecutre 258: Promises - Fetch API

// XMLHttpRequest - old way
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// Fetch API - new way
const request = fetch(`https://restcountries.com/v2/name/greece`);
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       // Request status: 200
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
//   // PromiseState === 'fulfilled'
// };

// Highly simplified version without console.logs...
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 2 - flat chain of promises
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response =>
      // Fulfilled promise
      response.json().then(data => renderCountry(data, 'neighbour'))
    )
    .catch(
      // Rejected - Catching/Handling the not internet connection error
      error => {
        console.error(`${error} 💥💥💥`);
        renderError(`Something went wrong 💥💥💥 ${error.message}. Try again!`);
      }
    )
    .finally(() => {
      // Default of promise -  it will happen to matter the result of the promise e.g. loading spinner
      countriesContainer.style.opacity = 1;
    });
  // PromiseState === 'pending' || === 'fulfilled' || === 'rejected'
};

// TODO: print all the neighbouring countries of the given country using promises

// Lecture 264: Handle Rejected Promises
// fetch() Promise rejection === No Internet Connection
btn.addEventListener('click', () => getCountryData('greece'));

// Web tool --> Network ---> Check disable cache + select Offiline
// GET https://restcountries.com/v2/name/greece net::ERR_INTERNET_DISCONNECTED

// Country that does not exist: Something went wrong 💥💥💥 Cannot read properties of undefined (reading 'flag'). Try again!
getCountryData('asdasd');
