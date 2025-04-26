'use strict';

// Lecture 293: Let's Fix Some Bad Code: Part 1
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// With object.freeze() we freeze the first layer / level of the object. We can still make changes inside of the object:
// budget[0].value = 10000; // works !
// budget[9] = 'jonas'; // clean.js:17 Uncaught TypeError: Cannot add property 9, object is not extensible

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// Lecture 295: Fixing some bad code - Part 2
// Try adding a new property to spending limits using 'use strict';
// spendingLimits.jay = 200;
// Uncaught TypeError: Cannot add property jay, object is not extensible

const getLimit = (limits, user) => limits?.[user] ?? 0;

// Impure function - mutates an object that's outside of itself
// const addExpense = function (value, description, user) {
//   if (!user) user = 'jonas';
//   user = user.toLowerCase();

//   if (value <= getLimit(user)) {
//     budget.push({ value: -value, description, user });
//   }
// };

// Pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // with Data Mutation
  // user = user.toLowerCase();

  // without Data Mutation
  const cleanUser = user.toLowerCase();

  // Functional programming: return the same array of objects and adding the new one at the end. If the value is outside of the specified user limit (e.g. pizza costs 100000 ionstead of 10) then return just the original array.
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;

  // Mutating original array
  // budget.push({ value: -value, description, user: cleanUser });
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// console.log(newBudget1);
// console.log(newBudget2);
// console.log(newBudget3);

// Impure function: mutates the original array of objects and therefor violates functional programming principles
// const checkExpenses = function () {
//   for (const entry of budget)
//     if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
// };

// FIX - Pure function
// const checkExpenses = function (state, limits) {
//   // for (const entry of newBudget3)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
// };

// Now that we converted an impure function to a pure one, convert it to arrow function:
const checkExpenses = (state, limits) =>
  // for (const entry of newBudget3)
  //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Prints the emoji of all the expenses above the given number e.g. 📱
// Impure function that constantly manipulates the output variable - violation of functional progrmaming
const logBigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget)
  //   output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

  // Functional version of the code above - pure function: doesn't mutate any original data
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // .reduce(
  //   (str, currentString) => `${str} / ${currentString.description.slice(-2)}`,
  //   ''
  // );
  console.log(bigExpenses);
};

// console.log(budget);
logBigExpenses(finalBudget, 500);
