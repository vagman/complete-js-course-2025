'use strict';

// Lecture 278: Pormise combinators: race, allSettled, any
const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage}: (${response.status})`);

    return response.json();
  });
};

// Promise.race(): receives an any of promises and returns a promise

// (async function () {
//   const response = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/asdafdSGSG`), // promise that wins the race is the rejected one
//     getJSON(`https://restcountries.com/v3.1/name/greece`),
//     getJSON(`https://restcountries.com/v3.1/name/malta`),
//   ]);
//   console.log(response[0]);
// })();

(async function () {
  const response = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/greece`),
    getJSON(`https://restcountries.com/v3.1/name/malta`),
  ]);
  console.log(response[0]);
})();

// Promise.race() is useful for:
// 1) Never ending promises
// 2) Very long running promises e.g. user has bad internet connection and a fetch request might take way too long to actually be useful to the user so we create a timeout promise which automatically rejects after a certain time has passed.

// Step 1. Create a timeout promise that rejectes after 10 seconds
const timeout = function (seconds) {
  // resolve will not be used
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long! Try again.'));
    }, seconds * 1000);
  });
};

// Step 2: Make the AJAX call (fetch() request) race against the promise with rejection timer

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(5), // 5 seconds until the call is autmaticlaly rejected
])
  .then(response => console.log(response[0]))
  .catch(error => console.error(error));

// Promise.allSettled(): takes as an argument an array of promises and returns an array of all settled promises no matter if they got rejected or not.
// trick: an automatically resolved promise: Promise.resolve('Success')

Promise.allSettled([
  Promise.resolve('Promise.allSettled(): Success'),
  Promise.reject('Promise.allSettled(): ERROR'),
  Promise.resolve('Promise.allSettled(): Another Success'),
]).then(response => console.log(response));

// Promise.allSettled() VS Promise.all(): all() short-circuits when 1 promise gets rejected
Promise.all([
  Promise.resolve('Promise.all(): Success'),
  Promise.reject('Promise.all(): ERROR'),
  Promise.resolve('Promise.all(): Another Success'),
])
  .then(response => console.log(response))
  .catch(error => console.error(error));

// Promise.any() [ES2021] It takes, as always, an array of promises and it returns the first fullfilled promise and ignore any rejected promises. So it basically will always return a fullfilled promise unless all of them are rejected.
Promise.any([
  Promise.resolve('Promise.any(): Success'),
  Promise.reject('Promise.any(): ERROR'),
  Promise.resolve('Promise.any(): Another Success'),
])
  .then(response => console.log(response))
  .catch(error => console.error(error));
