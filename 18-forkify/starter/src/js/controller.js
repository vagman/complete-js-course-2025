// import icons from '../img/icons.svg'; // Parcel v.1.xxx
import 'core-js/stable'; // Polyfill everything except async/await
import 'regenerator-runtime'; // Polyfill async await
import icons from 'url:../img/icons.svg';
import spinner from 'bundle-text:../img/spinner.svg';

const recipeContainer = document.querySelector('.recipe');
const API_KEY = process.env.PARCEL_API_KEY;

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
// Lecture 300: Loading a Recipe from API
// Step 1: npm init
// Step 2: write parcel start and build scripts in package.json
// Step 3: Install parcel with dev dependency: $ npm i parcel -D
// Step 4: Start parcel: $ npm start
// Step 5: Lecture 301 Render recipe: Install some more ode packages for Polyfilling (https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) $ npm i core-js regenerator-runtime
const renderSpinner = parentElement => {
  const markup = `
    <div class="spinner">
      ${spinner}
    </div>
  `;
  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    // 0. Getting the ID of the recipe (hash)
    const recipeId = window.location.hash.slice(1);

    // Guard clause because we get Error 500 if recipeId is undefined
    if (!recipeId) return;

    // 1. Loading recipe
    // const response = await fetch(
    //   `https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886?key=<${API_KEY}>`
    // );
    renderSpinner(recipeContainer);

    const response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${recipeId}`
    );
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    console.log(response, data);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);

    // 2. Rendering recipe
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${recipe.ingredients
          .map(ingredient => {
            return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ingredient.unit}</span>
                  ${ingredient.description}
                </div>
              </li>
          `;
          })
          .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
    // Initialization - Setting the container HTML to empty before filling with useful info in order to make the message dissapear: "Start by searching for a recipe or an ingredient. Have fun!"
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    alert(error);
  }
};

showRecipe();

// Lecture 302: Listening For load and hashchange Events

// DRY ! Duplicate Code when we cant to execute the same code for multiple fired events.
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

// Solution: Array of events
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);
// BUT now we get HTTP Error code 500 at http://localhost:1234/ because we have no recipeId (Step 0 in our try block in showRecipe() fails to get hash)
