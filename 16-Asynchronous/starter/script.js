'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
// Lecutre 258: AJAX Call : XMLHttpRequest
// updated URL: https://countries-api-836d.onrender.com/countries/

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

const renderError = function (errorMessage) {
  countriesContainer.insertAdjacentText('beforeend', errorMessage);
  countriesContainer.style.opacity = 1;
};

// Create reusable code - a function
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);

  // Send GET request to the specified URL
  request.send();

  // Doesn't work here because it isn't loaded yet
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    // Render country 1
    // renderCountry(data);

    // Get Neighbour country 2
    const neighbouringCountryCode = data.borders?.[0];

    if (!neighbouringCountryCode) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v2/alpha/${neighbouringCountryCode}`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      // console.log(data2);

      // Render country 1
      // renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('portugal');

// Callback hell: messy, non-maintenable code
// Solution to callback hell => Promises
setTimeout(() => {
  // console.log('1 second passed.');
  setTimeout(() => {
    // console.log('2 seconds passed.');
    setTimeout(() => {
      // console.log('3 seconds passed.');
      setTimeout(() => {
        // console.log('4 seconds passed.');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// Lecture 274: Consuming Promises with Async/Await
const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => {
        let msg = 'Something went wrong 💩';
        if (error.code === 1)
          msg = '🛑 Permission denied. Please allow location access.';
        else if (error.code === 2)
          msg = '📡 Position unavailable. Please try again later.';
        else if (error.code === 3)
          msg = '⏰ Timeout while trying to get your location.';

        reject(new Error(msg)); // Reject with a meaningful message
      }
    );
  });
};
// reverse geiolocaton API

// Async/Await are in reality promises
// Code below does exactly the same as the code above:
// fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));

const whereAmI = async function () {
  try {
    // Geolocation
    const position = await getPosition();
    const { latitude, longitude } = position.coords;

    // Reserve Geocoding
    const responseReverseGeocoding = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );
    // console.log(responseReverseGeocoding);
    if (!responseReverseGeocoding.ok)
      throw new Error('Problem fetching location data');

    const dataReverseGeocoding = await responseReverseGeocoding.json();
    // console.log(dataReverseGeocoding);

    // Country Data
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${dataReverseGeocoding.countryName}`
    );
    // console.log(response.json());

    const [data] = await response.json();
    // console.log(data);
    renderCountry(data);
    return `You are in ${dataReverseGeocoding.city}, ${dataReverseGeocoding.countryName}`;
  } catch (error) {
    console.error(`CUSTOM ERROR MESSAGE:\n\n', ${error}💥`);
    renderError('Something went wrong 💩');

    // Rejected promise returned from async function
    throw error;
  }
};

// whereAmI();

// console.log('FIRST');

// Lecture 275: Error handling with try{}...catch ()
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (error) {
//   console.error(error);
// }

// Lecture 276: Returning values from Async functions
console.log('1. Will get potiton');

// Async functions always return a promise
// const city = whereAmI();
// console.log(city);
whereAmI()
  .then(city => console.log(`2: ${city}`))
  .catch(err => console.error(`2: ${err.message} 💥`))
  .finally(() => console.log(`3. Finished getting location `));
