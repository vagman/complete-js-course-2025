// import icons from '../img/icons.svg'; // Parcel v.1.xxx
import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // Polyfill everything except async/await
import 'regenerator-runtime'; // Polyfill async await

const API_KEY = process.env.PARCEL_API_KEY;

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
    // Here we have an async function (controlRecipes()) calling inside her another async (loadRecipe()) and remeber that an async function always returns a promise which must be handled (await).
    await model.loadRecipe(recipeId);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
    // If we did export the entire recipeView class then here would you write:
    // const recipeView = new recipeView(model.state.recipe);
  } catch (error) {
    recipeView.renderErrorMessage();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
