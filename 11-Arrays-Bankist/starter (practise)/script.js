'use strict';

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Lecture 152: Creating DOM Elements
const displayMovements = function (movements) {
  movements.forEach(function (value, key, arr) {
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
movements.forEach(function (mov, i, arr) {
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
console.log(`Original array: ${arr}`);
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
console.log(...arr, ...arr2);

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

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set - it doesn't have keys and indexes !!!
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _value, map) {
  console.log(`${_value}: ${value}`);
});
// _variable : throw away variable, completely unecessary

// Lecture 154: Data transformations: Map, Filter, Reduce (3 Array Methods) - see Udemy notes
// Lecture 155: The map() Method
// Task: take the movements[] array and convert it from Euros (let's say it is a repesentation to Euros right now) to USD.
const eurToUSD = 1.1; // Convertion rate from Euros to USD

const movementsUSD = movements.map(function (value) {
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
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}$.`
);
console.log(movementsDescriptions);

// Lecture 157: Teh filter method
const deposits = movements.filter(function (mov) {
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
const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);
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

// Lecture 162: The find Method
// Returns the first element which returns the below condition True. find() also needs callback function which returns Boolean and find() return a single element.
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

// Lecture 166: The New findLast and findLastIndex Methods
console.log(movements);
// Starting form the beginning..
const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

// Challenge: Use the findLast() to print 'Your latest large movement was X movements ago'. Large is >= 2000$.

const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000
);
console.log(latestLargeMovementIndex);
console.log(
  `Your latest large movement was ${
    movements.length - latestLargeMovementIndex
  } movements ago.`
);

// Lecture 167: some and every
// EQUALITY
console.log(movements);
console.log(
  'Is there a movement with value -130 in movements array ?',
  movements.includes(-130)
);

// CONDITION
const anyDeposits = movements.some(mov => mov === -130);
console.log(
  'Are there any deposits in the movements array with value -130 ?',
  anyDeposits
);

const anyDeposits1 = movements.some(mov => mov > 0);
console.log(anyDeposits1);

// EVERY
console.log('------- EVERY() ------');
const everyDeposit = account4.movements.every(mov => mov > 0);
console.log(
  'Are all movements on account4 positive ? (No withdrawals)',
  everyDeposit
);

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));

// Lecture 168: flat() and flatmap()
console.log('----- Flat() and flatMap() -----');
const arr3 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr3.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// 2 level deep falt()
console.log(arrDeep.flat(2));

// Calculate the overall balance of all the movements
// const accountmovements = accounts.map(acc => acc.movements);
// console.log('All movements: ', accountmovements);
// const allMovements = accountmovements.flat();
// console.log(allMovements);
// const sumOfAllMovements = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(
//   'The sum of all the movements from all the bank accounts is: ',
//   sumOfAllMovements
// );

// Instead of doing all this work seperately, we can do this..
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log('flat(): ', overallBalance);

// flatMap() - It goes only one level deep
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log('flatMap(): ', overallBalance);

// Lecture 170: Sorting Arrays
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// Numbers
console.log(movements);

// return < 0, A, B
// return > 0, B, A

// Ascending
movements.sort((a, b) => a - b);

// Descending
movements.sort((a, b) => b - a);
console.log(movements);
// Be careful with sort(), it mutates the original array

// Lecture 171: Array Grouping
console.log('---- Lecture 171: Array Groupping ----');
console.log(movements);
const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'deposits' : 'withdrawals'
);
console.log(groupedMovements);

const groupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;
  if (movementCount >= 8) return 'very active';
  if (movementCount >= 4) return 'active';
  if (movementCount >= 1) return 'moderate';
  return 'inactive';
});

console.log(groupedByActivity);

// Lecture 172: More Ways of Creating and Filling Arrays
const arr4 = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Create an Array(n) with n number of emprty slots
const x = new Array(7);
console.log(x);
console.log(x.map(() => 5));

// Be careful: we overwrite the original array with fill() method
x.fill(1, 3, 5);
console.log(x);

console.log(arr4.fill(23, 2, 6));
// Array.from() method called directly from the Array object
const y = Array.from({ length: 7 }, () => 1);
console.log(y);
// Use underscore to let others know you don't use this parameter
const z = Array.from({ length: 7 }, (_, currentIndex) => currentIndex + 1);
console.log(z);

// Create an Array that has stored in it 100 random dice rolls
const dice100 = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);
console.log(dice100);

// Lecture 173: Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with
console.log(movements);
const reversedMov = movements.toReversed();
console.log(reversedMov);
console.log(movements);

// toSorted (sort), toSpliced(splice) work exactly the same as the originals but the diffrence is that they do not work on the original array but a copy of it

// movements[1] = 2000;
const newMovements = movements.with(1, 2000);
console.log(newMovements);
console.log(movements);

// Lecture 175: Array Methods Practise
// Q1: Calculate how much has been deposited in total in the bank
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((deposit, acc) => acc + deposit, 0);
console.log(`The sum of all deposits in the bank is: ${bankDepositSum} EUR`);
// Q1 How many deposits have been made in the bank with at least 1000$ ?
// First solution
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(`There are ${numDeposits1000} deposits with at least 1000 USD.`);

// Second solution
const numDeposits1000vol2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, currentEl) => (currentEl >= 1000 ? ++count : count), 0);
console.log(
  `There are ${numDeposits1000vol2} deposits with at least 1000 USD.`
);

// Prefix ++ operator
let a = 10;
console.log(a++);
console.log(a);

// Q3 Calculate the sum of all tjhe deposits and withdrawals
const { deposits1, withdrawals1 } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, current) => {
      // There is so code duplication in the code below
      // current >= 0 ? (sums.deposits += current) : (sums.withdrawals += current)
      // Better solution:
      sums[current > 0 ? 'deposits1' : 'withdrawals1'] += current;
      return sums;
    },
    { deposits1: 0, withdrawals1: 0 }
  );

console.log(deposits1, withdrawals1);

// Q4 Title case e.g. this is a nice title --> This Is a Nice Title
const convertToTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'on', 'or', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertToTitleCase('this is a nice title'));
console.log(convertToTitleCase('this is a LONG title but not too long'));
console.log(convertToTitleCase('and here is another title with an EXAMPLE'));
