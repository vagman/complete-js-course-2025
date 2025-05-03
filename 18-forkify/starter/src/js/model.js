// Module in which we will write out entire model.
import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
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
  } catch (error) {
    console.error(`ERROR: ${error}`);
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * 10; // 0;
  const end = page * state.search.resultsPerPage; // 9 * 10;
  return state.search.results.slice(start, end);
};
