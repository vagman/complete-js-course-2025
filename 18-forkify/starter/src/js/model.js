// Module in which we will write out entire model.
import { API_URL, RESULTS_PER_PAGE, API_KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

// Another example of an Async function (loadRecipe()) calling another Async function (getJSON())
export const loadRecipe = async recipeId => {
  try {
    const data = await getJSON(`${API_URL}${recipeId}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === recipeId))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (error) {
    // Temporary error handling
    console.error(`ERROR: ${error} 💩💩💩`);
    throw error;
  }
};

// Lectures 308 + 309: Implementing Search Results - Part 1 & 2
// This function is going to be called by the controller who will tell her  what is should search for.
export const loadSearchResults = async query => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });

    // FIX: Reset the page number to 1 when a recipe is already rendered before and we're in page 3 and going for a new search
    state.search.page = 1;
  } catch (error) {
    console.error(`ERROR: ${error}`);
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * 10; // On page = 1, start = 0 (0-based);
  const end = page * state.search.resultsPerPage; // So end will be 1 * 10;

  return state.search.results.slice(start, end); // 10 recipes on the first page
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
    // newQuantity = oldQuantity * newQuantity / oldServings
    // 2 * 8 / 4 = 4
  });
  // We are updating the original value of servings at the end of the function because otherwise we could not preserve the original value state.recipe.servings.
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = recipe => {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark (NEW object property created)
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// CALL ONLY FOR DEVELEPMENT: clear all bookmarks
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadNewRecipe = async newRecipe => {
  try {
    // Convert Object to Array in order to use map() and get all ingredients..
    // const ingredients = Object.entries(newRecipe).filter(entry => );
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingredient => {
        const ingredientsArray = ingredient[1].replaceAll(' ', '').split(',');
        if (ingredientsArray.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use trhe correct format :)'
          );
        const [quantity, unit, description] = ingredientsArray;

        // If there is quantity then convert it to Number otherwise (empty string) set it to null+
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cookingTime: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);
    console.log(data);
  } catch (error) {
    throw error;
  }
};
