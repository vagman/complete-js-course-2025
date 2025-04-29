// Module in which we will write out entire model.
import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
};

// Another example of an Async function (loadRecipe()) calling another Async function (getJSON())
export const loadRecipe = async recipeId => {
  try {
    const data = await getJSON(`${API_URL}/${recipeId}`);
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
