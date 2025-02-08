'use strict';

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

// Lecture 152: Creating DOM Elements
const displayMovements = function (movements) {
  movements.forEach(function(value, key, arr){
    console.log(key, value);
  });
};
displayMovements(account1.movements);

// LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Lecture 149: Looping Arrays: foreach()
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}$.`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}$.`);
  } 
}
console.log('----- FOREACH ------');
// Now implement the same with forEach()
movements.forEach(function(mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}$.`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}$.`);
  }
});
/* forEach executes an anonymous function in every iteration
  iteration 0: anonymous function(200)
  iteration 1: anonymous function(450)
  iteration 2: anonymous function(-400)
  ...
*/

// Lecture 147: Simple Array Methods
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
// End parameter is NOT included, just like in strings (endParam - startParam)
console.log(arr.slice(2, 4));
// Start retrieving elements from the END of the array
console.log(arr.slice(-2));
// Start: postion No.1 end at the end minus the last 2 elements
console.log(arr.slice(1, -2));
console.log(arr.slice()); // sallow copy #1
console.log([...arr]); // sallow copy #2

// SPLICE
// console.log(arr.splice(2)); // The original array has changes values !!!
// Delete the last element of the array:
console.log(`Original array: ${arr}`)
arr.splice(-1);
console.log(`Spliced last element: ${arr}`);
arr.splice(1, 2);
console.log(arr);


// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log('The original array has been mutated: ', arr2);

// CONCAT
// Unify two arrays swithout mutating them:
const letters = arr.concat(arr2);
console.log(letters);
// 2nd way - without mutating any of the two arrays again:
console.log(...arr, ...arr2)

// JOIN
console.log(letters.join('-'));

// Lecture: The new at() method
const arr1 = [23, 11, 64];
// traditional way
console.log(arr1[0]);
// at() method
console.log(arr1.at(0));

// get the last element of the array
console.log(arr1[arr1.length - 1]);
console.log(arr1.slice(-1)[0]);
console.log(arr1.at(-1));

console.log('jonas'.at(0));
console.log('jonas'.at(-1));

// Lecture 150: Foreach with Maps and Sets
// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set - it doesn't have keys and indexes !!!
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function(value, _value, map) {
  console.log(`${_value}: ${value}`)
});
// _variable : throw away variable, completely unecessary

// Lecture 154: Data transformations: Map, Filter, Reduce (3 Array Methods) - see Udemy notes
// Lecture 155: The map() Method
// Task: take the movements[] array and convert it from Euros (let's say it is a repesentation to Euros right now) to USD.
const eurToUSD = 1.1; // Convertion rate from Euros to USD

const movementsUSD = movements.map(function(value) {
   return value * eurToUSD;
});

console.log(movements);
console.log(movementsUSD);

const movementsUSDForLoop = [];
for (const mov of movements) {
  movementsUSDForLoop.push(mov * eurToUSD);
}
console.log(movementsUSDForLoop);

const movementsUSDArrowFunction = movements.map(value => value * eurToUSD);
console.log(movementsUSDArrowFunction);

const movementsDescriptions = movements.map(
  (mov, i) =>  
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}$.`
);
console.log(movementsDescriptions);

// Lecture 157: Teh filter method
const deposits = movements.filter(function(mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsForLoop = [];
for (const mov of movements) if (mov > 0) depositsForLoop.push(mov);
console.log(depositsForLoop);

// filter() method with arrow function implementation
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// For-of loop implementation
const withdrawlsForLoop = [];
for (const mov of movements) if (mov < 0) withdrawlsForLoop.push(mov);
console.log(withdrawlsForLoop);

// Lecture 158: reduce() method
// acc is an accumulator that "snowballs" all the elements of the array
// cur: is the current element of it's iteration of reduce method
const balance = movements.reduce((acc, cur) => acc + cur, 0);
// 0 is the initialization value of the accumulator arguement
console.log(balance);

// For-of implementation of the above
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Get maximum value of movements array
// Second arguement of reduce() is the initial value of movements[]. We set it as max and we compare it with the second value and so on...
const max = movements.reduce((acc, mov) => (acc > mov) ? acc : mov, movements[0]);
console.log(max);

// Lecture 160: The Magic of Chaining Methods
// PIPELINE
const eurToUSD1 = 1.1;
const totalDepositsToUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUSD1;
  })
  //.map(mov => mov * eurToUSD1)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsToUSD);
