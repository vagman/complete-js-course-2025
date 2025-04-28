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

const showRecipe = async function () {
  try {
    const response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886?key=<${API_KEY}>`
    );
    // const response = await fetch(
    //   `https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8433?key=<${API_KEY}>`
    // );
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    console.log(response, data);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceurl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);
  } catch (error) {
    alert(error);
  }
};

showRecipe();
