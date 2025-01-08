'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

let weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours, // ES6 Enhanced object literals

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    // console.log(
    //   `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    // );
  },

  orderPasta(ingredient1, ingredient2, ingredient3) {
    // console.log(
    //   `Here is your delicious pasta with ${ingredient1}, ${ingredient2}, ${ingredient3}.`
    // );
  },

  orderPizza(mainIngredient, ...otheringredients) {
    if (otheringredients.length === 0) {
      // console.log(
      //   `Here is your delicious pizza with only one ingredient: ${mainIngredient}.`
      // );
    } else {
      let result = `Here is your delicious pizza with ${mainIngredient}, `;
      for (let i = 0; i < otheringredients.length; i++) {
        if (i === otheringredients.length - 1) {
          // console.log(`${result}and ${otheringredients[i]}.`);
        } else {
          result += otheringredients[i] + ', ';
        }
      }
    }
  },
};

// 1) Destructuring
// SPREAD, because right side of =
const arr = [1, 2, ...[3, 4]];

// RESRT, because on LEFT aside of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

const [pizza, , rissoto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
// console.log(pizza, rissoto, otherFood);

// Objects
// const { sat, ...weekdays } = restaurant.hours;
// console.log(weekdays);

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  // console.log(sum);
};

// Usage examples of add()
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

// console.log('------ OR ------');
// // Logical operator can use, return any data type, short-circuiting
// console.log(3 || 'Jonas'); // First value (3) is truthy value, so its returned
// console.log('' || 'Jonas'); // 'Jonas' because '' is falsy value
// console.log(true || 0); // true, because its truthy value
// console.log(undefined || null); // null because undefined is falshy value adn we try short-circuiting with the second value !!!

// console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello because it's the first truthy value starting from left

// restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log('------ AND ------');
// console.log(0 && 'Jonas'); // First value is Falshy so it's returned
// console.log(7 && 'Jonas'); // 'Jonas', because both first and second values are Truthy, so the last one is returned
// console.log('Hello' && 23 && null && 'jonas'); // Hello is truthy value, 23 is Truthy value, null is falshy value so the rest of the evaluation is short-circuited and null is returned

// Practical example: If Function exists
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

// Avoid if statement with && operator
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// ||: returns the first truthy value, last element if there arent any
// &&: returns the first falshy value, last element if there arent any

// Lecture: The Nullish Coalescing Operator (??)
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
// console.log(guests);

// ??: Only Nullish values will shortcurcuit: null and undefined (NOT 0 or ''). Only if numGuests is null/undefined it will assign the value 10 to guestsCorrect.
const guestsCorrect = restaurant.numGuests ?? 10;
// console.log(guestsCorrect);

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// Assigning default value 10 if there in no NumGuests variable in the object
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// Shorter and same result as above
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Nullish assignment operator (nul or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// Make the owners name 'Anonymous' if it exists
rest1.owner &&= 'Anonymous';
rest2.owner &&= 'Anonymous';

// console.log(rest1);
// console.log(rest2);

// Lecture: looping Arrays: The For-of loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) {
  // console.log(item);
}

for (const [i, el] of menu.entries()) {
  // console.log(`${i + 1}: ${el}`);
}
// console.log([...menu.entries()]);
// Lecture: Optional chaining (.?)
if (restaurant.openingHours.mon && restaurant.openingHours.mon)
  // console.log(restaurant.openingHours.mon.open);

  // console.log(restaurant.openingHours.mon.open);

  // With optional chaining
  // console.log(restaurant.openingHours.mon?.open);
  // console.log(restaurant.openingHours?.mon?.open);

  // Example
  // const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    // console.log(`On ${day}, we open at ${open}.`);
  }

// Optional chaining used also with Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist.');
// console.log(restaurant.orderRissoto?.(0, 1) ?? 'Method does not exist.');

// Also wroks with Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// console.log(users[0]?.name ?? 'Users array empty');

if (users.length > 0) {
  // console.log(users[0].name);
} else {
  // console.log('User array empty');
}

// Property Names
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property Values
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
// console.log(entries);

for (const [key, {open, close}] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}.`);
}

<<<<<<< HEAD

=======
>>>>>>> f18e02502802c6854ad35d0da0785eac8781eb07
// Lecture: Sets
const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza']);

console.log(orderSet);

console.log(new Set('Jonas'));

console.log(orderSet.size);

// Similar to includes() for Arrays:
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));

orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
orderSet.delete('Risotto');

console.log(orderSet);

for (const order of orderSet) console.log(order);


// Use case for Sets: remove duplicate values from arrays ! Example: 
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// Conversion from Set back to Array
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

// How many diffrent roles are in our business ?
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size);

// How mnay diffrent letters are in a specific string ?
console.log(new Set('jonasschmedtmann').size);

// Lecture: New Operations to Make Sets Useful! ES 2025 
const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Find which foods are in both of the sets
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log('Intesection: ', commonFoods);
// Convert it to an array by spread operator
console.log('Array intersection:', [...commonFoods]);

// Union method: All elements in 2 sets without the duplicates
const italianMexicanFusion = italianFoods.union(mexicanFoods);
console.log(italianMexicanFusion);

// Union of arrays but with duplicates...(spread operator)
const unionWithDuplicates = [...italianFoods, ...mexicanFoods];
console.log(unionWithDuplicates);

// Diffrent way without using union method...
console.log([...new Set([...italianFoods, ...mexicanFoods])]);

// Diffrence method: Elements that are in the FIRST set but NOT in the SECOND
const uniqueItaliaFoods = italianFoods.difference(mexicanFoods);
console.log('Difference Italian: ', uniqueItaliaFoods);
const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
console.log('Difference Mexican', uniqueMexicanFoods);

// Unique italian and unique mexican foods but not the middle part (Ven diagram)
const uniqueItalianAndMexicanFoods = italianFoods.symmetricDifference(mexicanFoods);
console.log('Unique Italian and Unique Mexican foods: ', uniqueItalianAndMexicanFoods);

// Last one for now,that was also added in ES2025
console.log('Are Italian foods and Mexican foods sets completely different ?', italianFoods.isDisjointFrom(mexicanFoods));

// Lecture: Maps Fundamentals
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
.set('open', 11)
.set('close', 11)
.set(true, 'We are open :D')
.set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get('true'));
console.log(rest.get('1'));

// Small little game
const time = 21; // 9 p.m.
// Boolean value that retrieves restaurant open or closed times and prints if it's open
console.log('Is the restaurant open at 9 p.m. ?', rest.get(time > rest.get('open')) && time < rest.get('close')); 

console.log('Does the restaurant have "categories" key ?', rest.has('categories'));

// Delete elemets by Key: Lisbon restaurant has closed...
console.log('Lisbon restaurant has to close: ', rest.delete(2));
console.log(rest);

// Retrieve size of the map
console.log('How many items does the restaurant map has ?', rest.size);

// Delete all elements of the map
// rest.clear();
// console.log(rest);

const arr1 = [1, 2];
rest.set(arr1, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr1));

// Lecture: Maps Iterations
const question = new Map([
  ['question', 'What is the best programming language in the world ?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!']
]);
console.log(question);

// Convert object to Map
console.log('openingHours as an Array of Arrays:', openingHours);
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Map converted to Array and then destructured
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof(key) === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
} 
const answer = 3;
// const answer = Number(prompt('Your answer: '));

console.log(question.get(answer === question.get('correct')));

// Convert map to array
console.log(...question);
// console.log(...question.entries()); Exactly as the above ...question
console.log([...question.keys()]);
console.log([...question.values()]);

// Lecture: Arrays VS Sets VS Objects VS Maps

// Lecture: 