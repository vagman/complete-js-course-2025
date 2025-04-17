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
    renderCountry(data);

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
      console.log(data2);

      // Render country 1
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('portugal');

// Callback hell: messy, non-maintenable code
// Solution to callback hell => Promises
setTimeout(() => {
  console.log('1 second passed.');
  setTimeout(() => {
    console.log('2 seconds passed.');
    setTimeout(() => {
      console.log('3 seconds passed.');
      setTimeout(() => {
        console.log('4 seconds passed.');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// Lecture 274: Consuming Promises with Async/Await
const whereAmI = async function (country) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  console.log(res);

  // Async/Await are in reality promises
  // Code below does exactly the same as the code above:
  // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));
};

whereAmI('greece');
console.log('FIRST');
