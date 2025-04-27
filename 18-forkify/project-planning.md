*Lecture 298. Project Overview and Planning (I)*

## Project Planning

### 1. User Stories

* A user story is a description of the application's functionality from the user's perspective.
* A common format is: *As a [type_of_user],I want [an action] so that [a benefit]*.
* User stories put together will provide a clear picture of how the whole application is going to work. 
* User stories are written usually before any project implementation and are a part of the brainstorming process.

Some examples of user stories could be:
1. As a user, I want to **search for recipes**, so that I can find new ideas for meals.
2. As a user, I want to be able to **update the number of servings**, so that I can cook a meal for diffrent number of people.
3. As a user, I want to **bookmark recipes**, so that i can review them later.
4. As a user, I want to be able to **create my own recipes**, so that I have them all organized in the same app.
5. As a user, I want to be able to **see my bookmarks and own recipes when I leave the app and come back later**, so that I can close the app safely after cooking.

### 2. Features
Now let's convert the user stories to actual features:
1. As a user, I want to search for recipe, so that I can find new ideas for meals. &rarr;
    * Search functionality input field to send request to API with searched keywords.
    * Display results with pagination
    * Display recipe with cooking time, serbings and ingredients
2. As a user, I want to be able to update the number of servings, so that I can cook a meal for diffrent number of people. &rarr; 
    * Change servings functionality: update all ingredients according to current number of serbings

3. As a user, I want to bookmark recipes, so that i can review them later. &rarr;
    * Bookmarking functionality: display list of all bookmarked recipes.

4. As a user, I want to be able to create my own recipes, so that I have them all organized in the same app. &rarr; 
    * User can upload own recipes.
    * User recipes will automatically be bookmarked.
    * User can only see their own recipes, not recipes from other users.

5. As a user, I want to be able to see my bookmarks and own recipes when I leave the app and come back later, so that I can close the app safely after cooking. &rarr; 
    * Store bookmark data in the browser using local storage.

### 3. Flowchart 

#### Flowcahrt (Part 1)
![flowchart part 1](./starter/forkify-flowchart-part-1.png "Flowcahrt (Part 1)")

#### Flowcahrt (Part 2)
![flowchart part 2](./starter/forkify-flowchart-part-2.png "Flowcahrt (Part 2)")

#### Flowcahrt (Part 3)
![flowchart part 3](./starter/forkify-flowchart-part-3.png "Flowcahrt (Part 3)")

### 4. Architecture


