'use strict';

// Lecture 219 Constructor Functions and the "new" Operator
const Person = function (firstName, brithYear) {
  // Instance properties
  this.firstName = firstName;
  this.brithYear = brithYear;

  // Methods
  // Never do this
  // if we create 1000 Person objects, each of them will carry around this function
  this.calcAge = function () {
    console.log(2037 - this.brithYear);
  };
};

const vagman = new Person('Vaggelis', 1999);
console.log(vagman);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} is linked to prototype
// 4. function automatically return {}

const malitlda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(malitlda, jack);

console.log('Is vagman instance of Person ?', vagman instanceof Person);
