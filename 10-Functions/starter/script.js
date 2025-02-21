'use strict';

const bookings = [];
const createBooking = function(flightNum, numPassengers = 1, price = 199 * numPassengers) {
    // ES5 Way: (Not the best)
    // numPassengers = numPassengers || 1;
    // price = price || 199;
    
    const booking = {
        flightNum,
        numPassengers,
        price
    }
    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000)

// Lecture 2
const flight = 'LH1234';
const jonas = {
    name: 'Jonas Schmedtmann',
    passport: 24739479284
}

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;
    if (passenger.passport === 24739479284) {
        // alert('Checked in');
        console.log('Checked in');
    } else {
        // alert('Wrong passport!');
        console.log('Wrong passport!');
    }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function(person) {
    person.passport = Math.trunc(Math.random() * 10000000000);
}

newPassport(jonas);
checkIn(flight, jonas);

// Lecture 136: Functions Accepting Callback Functions
const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

// transformer is a Higher-order function
const transformer = function(str, fn) {
    console.log(`Original string: ${str}`)
    console.log(`Transormed string: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}().`)
}
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JavaScript uses callbacks all the time
const high5 = function () {
    // console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);

// Lecture: Functions returning Functions
const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
}
const greeterHey = greet('Hey!');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

// Exercise: Rewrite the greet() function as an arrow function
const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name} from an arrow function.`);

greetArrow('Hi')('Jonas');

// Lecture: call(), apply() and bind()
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`);
        this.bookings.push({flight: `this.iataCode}${flightNum}, name`});
    }
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],   
};

const book = lufthansa.book;

// Does NOT work!
// book(23, 'Sarah Williams');

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
}

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Apply method - not used anymore in modern JavaScript
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// Modern method using: call() + spread operator
book.call(swiss, ...flightData);

// Bind method: this keyword is connected to the eurowings object 
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};

lufthansa.buyPlane;
// bind(lufthasa): it is going to return a new function, a copy of buyPlane()
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Example
// Partial applciation - preset parameters. Not interested in this keyword now
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23); // this heyword = null, rate = 0.23
// The above is same as writing:
// addTax = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));

// bind() gives us a new function specific to our needs. 
// CHALLENGE: Rewrite the example above (addTax() and bind() call) using the technique of a function returning a function
const addTaxRate = function(rate) {
    return function(value) {
        return value + value * rate;
    }
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

console.log('----- CHALLENGE No.1 -----');
// Coding Challenge #1
/* 
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.
Here are your tasks:
HINT: Use many of the tools you learned about in this and the last section 😉
GOOD LUCK 😀
*/
const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 
    answers: new Array(4).fill(0),
    /* 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things: */
    registerNewAnswer () {
        /* 1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number) */
        const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));
        /* 1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?) */
        // SHORT-CIRCUITING:
        typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;
        // 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
        this.displayResults();
    },
    /*
    3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
    */
    displayResults (type = 'array') {
        if (type === 'array') {
            console.log(this.answers);
        } else if (type === 'string') {
            console.log(`Poll results are ${this.answers.join(', ')}`);
        }
   },
};
// 2. Call this method whenever the user clicks the "Answer poll" button.
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

/* BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?
BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1] */
poll.displayResults.call({answers: [5, 2, 3]});
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]});
// CHALLENGE 1: END

// Lecture: Immedietly invoked function expressions (IIFE)
const runOnce = function () {
    console.log('This will never run again.');
};
runOnce();

// (...) Transformed statement into an IIFE (Immedietly invoked function expression)
(function() {
    const isPrivate = 23; // Data Encaplsulated / Privacy
    console.log('This will never run again for sure!');
})();

(() => console.log('This will ALSO never run again'))();

// We cannot access the isPrivate variable below inside the block {}
// var overrides block-scope variables and that;'s why we should avoid it
{
    const isPrivate = 23;
    var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);

// Lecture: Closures
const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(passengerCount);
    }
};
// booker is a function as secureBooking returns a function !!!
const booker = secureBooking();
console.log(booker.passengerCount)
booker();
booker();
booker();

console.dir(booker);

// Lecture: More closure examples
// Example 1
let f;
const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    }
};

const h = function() {
    const b = 777;
    f = function () {
        console.log(b * 2);
    }
};

g();
f();
console.dir(f);
// Re-assigning f function inside h()
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function(n, wait) {
    const perGroup = n / 3;
    // Whatever is inside that function block will be executed after 1 second
    setTimeout(function(){
        console.log(`We are now boarding all ${n} passengers.`);
        console.log(`There are 3 groups, each with ${perGroup} passengers.`);
    }, wait * 1000); 
    console.log(`We will start boarding in ${wait} seconds.`);
};

// 180 total passengers, boarding starts in 3 seconds
// boardPassengers(180, 3);

const perGroup = 1000;
boardPassengers(180, 3);

/* 
Coding Challenge #2 (Closures)
This is more of a thinking challenge than a coding challenge 🤓
Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again! And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.
GOOD LUCK 😀
*/
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function() {
    header.style.color = 'blue';
  })
})();

/*
Question: How does the function in lines 339 - 341 has access to the header variable ?

Explanation: Closure gives the inner function access to all the variables of its parent function, although the parent function, which is immedietly called with (...)(); has returned. The inner function keeps access to the outer scope of it's creation (header variable in our case) throughout time.
*/
