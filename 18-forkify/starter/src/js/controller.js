import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchRecipeView from './views/searchRecipeView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable'; // Polyfill everything except async/await
import 'regenerator-runtime/runtime'; // Polyfill async await

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

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

    // 0. Update results view to mark currently selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1. Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2. Loading recipe
    // Here we have an async function (controlRecipes()) calling inside her another async (loadRecipe()) and remember that an async function always returns a promise which must be handled (await).
    await model.loadRecipe(recipeId);

    // 3. Rendering recipe
    recipeView.render(model.state.recipe);
    // If we did export the entire recipeView class then here would you write:
    // const recipeView = new recipeView(model.state.recipe);
  } catch (error) {
    recipeView.renderErrorMessage();
    console.error(error);
  }
};

const controlSearchResults = async function () {
  try {
    // Render loading spinner
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchRecipeView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = goToPageNumber => {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPageNumber));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = newServings => {
  // 1. Update the recipe servings (in the state) - updating the underlying data
  model.updateServings(newServings);

  // 2. Update the recipeView
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async newRecipe => {
  try {
    // Render spinner for better UX
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadNewRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderSuccessMessage();
    // Close recipe modal to view rendered recipe
    setTimeout(() => {
      addRecipeView.toggleRecipeModal();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(`💣💣💣ERROR: ${error}`);
    addRecipeView.renderErrorMessage(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchRecipeView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUploadRecipe(controlAddRecipe);
};
init();
