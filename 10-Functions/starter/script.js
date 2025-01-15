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
// const flightNium = flight;
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
