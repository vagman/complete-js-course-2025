'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2025-02-15T17:01:17.194Z',
    '2025-02-19T23:36:17.929Z',
    '2025-02-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2025-02-15T14:43:26.374Z',
    '2025-02-19T18:49:59.371Z',
    '2025-02-21T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0); // zero based !!!
  // const year = date.getFullYear();
  // return `${day}/${month}${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

// Lecture 189: Internationalizing Numbers (Intl)
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// Lecture 152: Creating DOM Elements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(movement, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

// Lecture 160: The magic of chaining methods
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

// Lecture 156: Computing usernames for the app's users
// username should be: stw
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
// We don't need to return anything because we are working on the array accounts[]. We aren't creating anything new here.
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  // Dispaly balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Lecture 162: The find() method
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// Exercise: convert the above functionality to a for...of loop:
const accountForOf = function (accounts) {
  for (const acc of accounts) {
    if (acc.owner === 'Jessica Davis') {
      return acc;
    }
  }
};
// console.log(accountForOf(accounts));
// Lecture 163: Implemeting Login
// Event Handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submiting, using and event arguement
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and a welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // 'long', 'numeric', '2-digit', 'short'
      year: 'numeric', // '2-digit'
      // weekday: 'numeric', // 'short', 'long', 'narrow
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // Language Code Table: http://www.lingoes.net/en/translator/langcode.htm
    // the format we want is: dd/mm/YYYY
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); // zero based !!!
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    // Clear login input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // Remove focus on PIN element: inputLoginPin.blur(); (non needed in Chrome)
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username &&
    receiverAcc
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

// Only grant a loan if there is a deposit with atleast 10% of the requested loan amount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    // Add movement
    currentAccount.movements.push(amount);
    console.log(currentAccount.movements);

    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Lecture 165: The findIndex() Method - Close account functionality
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account: Splice works on the array itself and doesn't create a new one
    accounts.splice(index, 1);

    // Clear fields
    inputCloseUsername.value = inputClosePin.value = '';

    // Hide UI
    containerApp.style.opacity = 0;
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// Lecture 171: Array Grouping
const groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
console.log(groupedAccounts);

// Let's assume we do not have the movements stores in an array. They are only displayed in the UI.
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    element => +element.textContent.replace('€', '')
  );
  console.log(movementsUI);
  // movementsUI2 = [...document.querySelectorAll('.movements__value')];
  // Here mapping has to be done seperatly so Array.from() is cleaner
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// Lecture 179: Converting and Checking Numbers
console.log(23 === 23.0); // true

// Decimal (base 10): 0-9
// Binary (base 2): 0-1
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);

// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px'), 10); // 30 , base 10
console.log(Number.parseInt('e30'), 10); // NaN , number has to be at the beginning
console.log(Number.parseFloat('   2.5rem')); // 2.5
console.log(Number.parseInt('   2.5rem   ')); // 2

// check if a value is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // false , Infinity value type

// Best way of checking if a value is number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false

// Lecture 180: Math and Rounding
console.log(Math.sqrt(25)); // swuare root
console.log(25 ** (1 / 2));
console.log(25 ** (1 / 3)); // cubic root

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2));

console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Random values 1 - 6
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(10, 20));
console.log(randomInt(0, 3));

// Rounding integers
console.log(Math.trunc(23.3));

console.log(Math.round(23.3));
console.log(Math.round(23.9));

// Round up
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

// Round down
console.log(Math.floor(23.9));
console.log(Math.floor('23.9'));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// Rounding decimals
console.log((2.7).toFixed(0)); // returns String !!!
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2)); // Convert it back to Number

// Lecture 181: Remainder Operator
console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

// Check if a number is even or odd
console.log(7 % 2); // even number
console.log(7 / 2);

const isEven = number => number % 2 === 0;

console.log(isEven(8)); // true
console.log(isEven(23)); // false
console.log(isEven(514)); // true

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

// Lecture 183: Working with BigInt
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 - 3);
console.log(2 ** 53 - 4);

// ES2020 BigInt introduced
console.log(4239091293949123094900123444123n);
console.log(BigInt(423909129));

// Operations
console.log(10000n + 10000n);
console.log(541982349777129838949841289318939812498n * 1000000n);
// console.log(Math.sqrt(16n)); // ERROR

const huge = 54198234977712983894912893981n;
const num = 23;
console.log(huge * BigInt(num));

console.log(20n > 15); // true
console.log(20n === 20); // false

console.log(typeof 20n); // bigint
console.log(20n == '20'); // true

console.log(huge + 'is REALLY big !!!');

// Divisions
console.log(11n / 3n); // 3n
console.log(10 / 3); // 3.3333333333333335

// Lecture 184: Creating Dates
// Create a date
/*
const now = new Date();
console.log(now);

console.log(new Date('Tue Feb 18 2025 16:21:38'));
console.log(new Date('December 24, 2015'));

console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 33, 15, 23, 5));

console.log(new Date(0));
// 3 days after the date above is: 3 * 24 hours * 60 mins * 60 seconds * 1000 miliseconds - timestamp of day No.3
console.log(new Date(3 * 24 * 60 * 60 * 1000));
*/

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);

console.log(future.getFullYear());
console.log(future.getMonth()); // 0 based
console.log(future.getDate()); // Get date
console.log(future.getDay()); // day of the week, 4: Thursday
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

// International standard string
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142249780000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);

// Lecture 187: Operations With Dates
const future1 = new Date(2037, 10, 19, 15, 23);
console.log(+future1);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
const days1 = calcDaysPassed(
  new Date(2037, 3, 14),
  new Date(2037, 3, 14, 10, 8)
);
console.log(days1);
// TODO: Date library moment.js (FREE)

// Lecture 188: Internationalizing Numbers (Intl)
const num1 = 3884764.23;

const options = {
  style: 'currency', // 'percent', 'unit', 'currency'
  unit: 'celsius', // 'celcius', 'mile-per-hour',
  currency: 'EUR', // 'EUR', 'USD'
  // useGrouping: false,
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
};

console.log('US:', new Intl.NumberFormat('en-US', options).format(num1));
console.log('Greece:', new Intl.NumberFormat('el-GR', options).format(num1));
console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(num1));
console.log('Syria:', new Intl.NumberFormat('ar-SY', options).format(num1));
console.log(
  'Browser:',
  new Intl.NumberFormat(navigator.language, options).format(num1)
);
