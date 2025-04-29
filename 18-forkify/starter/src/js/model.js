// Module in which we will write out entire model.
import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async recipeId => {
  try {
    const response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${recipeId}`
    );
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    console.log(response, data);

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
    console.error(`ERROR: ${error}`);
  }
};
