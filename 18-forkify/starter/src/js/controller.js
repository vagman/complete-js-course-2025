// import icons from '../img/icons.svg'; // Parcel v.1.xxx
import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // Polyfill everything except async/await
import 'regenerator-runtime'; // Polyfill async await

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
const controlRecipes = async function () {
  try {
    // 0. Getting the ID of the recipe (hash)
    const recipeId = window.location.hash.slice(1);

    // Guard clause because we get Error 500 if recipeId is undefined
    if (!recipeId) return;
    recipeView.renderSpinner();

    // 1. Loading recipe
    // Here we have an async function (controlRecipes()) calling inside her another async (loadrecipe()) and remeber that an async function always returns a promise which must be handled (await).
    await model.loadRecipe(recipeId);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
    // If we did export the entire recipeView class then here would you write:
    // const recipeView = new recipeView(model.state.recipe);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
};

controlRecipes();

// Lecture 302: Listening For load and hashchange Events

// DRY ! Duplicate Code when we cant to execute the same code for multiple fired events.
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// Solution: Array of events
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
// BUT now we get HTTP Error code 500 at http://localhost:1234/ because we have no recipeId (Step 0 in our try block in controlRecipes() fails to get hash)
