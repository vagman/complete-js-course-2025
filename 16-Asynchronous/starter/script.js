'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Lecutre 258: AJAX Call : XMLHttpRequest
// updated URL: https://countries-api-836d.onrender.com/countries/

// Create reusable code - a function
const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://countries-api.jonas.io/countries/name/${country}`
  );

  // Send GET request to the specified URL
  request.send();

  // Doesn't work here because it isn't loaded yet
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //   console.log(data.)

    const html = `
        <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
        `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountry('greece');
getCountry('portugal');
getCountry('usa');
