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
  // countriesContainer.style.opacity = 1;
};

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// 2025 Working: v.3.1 RestCountries API: https://restcountries.com/v3.1/name/ & https://restcountries.com/v3.1/alpha/

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
// Lecutre 258: Promises - Fetch API

// XMLHttpRequest - old way
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// Fetch API - new way
// const request = fetch(`https://restcountries.com/v3.1/name/greece`);
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

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage}: (${response.status})`);

    return response.json();
  });
};

// Highly simplified version without console.logs...
const getCountryData = country => {
  // Country 1
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found.'
  )
    .then(data => {
      renderCountry(...data);
      const neighbourCode = data[0].borders ? data[0].borders[0] : undefined;

      if (!neighbourCode) throw new Error('No neigbour found');

      // Country 2 - flat chain of promises
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbourCode}`,
        'No neighbours found.'
      );
    })
    .then(data => renderCountry(...data, 'neighbour'))
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
btn.addEventListener('click', () => getCountryData('australia'));

// Web tool --> Network ---> Check disable cache + select Offiline
// GET https://restcountries.com/v2/name/greece net::ERR_INTERNET_DISCONNECTED

// Country that does not exist: Something went wrong 💥💥💥 Cannot read properties of undefined (reading 'flag'). Try again!
// getCountryData('asdasd');

// Lecture 271: Building a Simple Promise
// Only one arguement - executer function()
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    // 50% of winning the lottery
    if (Math.random() >= 0.5) {
      // Set promise as fullfiled / resolved
      resolve('You won !💰');
    } else {
      // Set promise as rejected
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

// Consuming the promise
lotteryPromise
  .then(resolvedValue => {
    console.log(resolvedValue);
  })
  .catch(error => console.log(error));

// Promisifying setTimeout Exercise: convert the callback based asynchronous behaviour to promise based.
const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

// From Lecture: Callback Hell
//
// setTimeout(() => {
//   console.log('1 second passed.');
//   setTimeout(() => {
//     console.log('2 seconds passed.');
//     setTimeout(() => {
//       console.log('3 seconds passed.');
//       setTimeout(() => {
//         console.log('4 seconds passed.');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promisify the codeblock above
wait(1)
  .then(() => {
    console.log('1 second passed.');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed.');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed.');
    return wait(1);
  })
  .then(() => console.log('4 seconds passed.'));

// Promise wil be resolved immedietly with resolve()
Promise.resolve('abc').then(x => console.log(x));
Promise.resolve(new Error('Problem!')).catch(x => console.error(x));
