'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// Lecture 272: 272. Promisifying the Geolocation API

// Asynchronous behaviour, non-blicking code
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   error => console.error(error)
// );
// console.log('Getting position');

// Exercise: Promisify the code above
const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   error => reject(error)
    // );

    // Exactly the same as above
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(position => console.log(position));

const renderCountry = function (data, className) {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed()}M people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const whereAmI = function () {
  getPosition()
    .then(position => {
      const { latitude, longtitude } = position.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longtitude}`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`ERROR with geocoding API: ${response.status}.`);
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}.`);

      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(response => {
      if (!response.ok)
        return new Error(`Country not found. ${response.status}`);

      return response.json();
    })
    .then(data => Country(data[0]))
    .catch(error => console.error('ERROR:', error));
};

btn.addEventListener('click', whereAmI);
