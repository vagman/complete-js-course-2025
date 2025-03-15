'use strict';

// Lecture 219 Constructor Functions and the "new" Operator
const Person = function (firstName, brithYear) {
  // Instance properties
  this.firstName = firstName;
  this.brithYear = brithYear;

  // Methods
  // Never do this
  // if we create 1000 Person objects, each of them will carry around this function
  //   this.calcAge = function () {
  //     console.log(2037 - this.brithYear);
  //   };
};

const vagman = new Person('Vaggelis', 1999);
console.log(vagman);

// Steps
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} is linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log('Is vagman instance of Person ?', vagman instanceof Person);

// Lecture 220: Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.brithYear);
};

vagman.calcAge();
matilda.calcAge();
jack.calcAge();

console.log(vagman.__proto__);
// Vagman's object prototype (vagman.__proto__) is the prototype property of the Person constructor function
console.log(vagman.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(vagman));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// Set properties on the prototype
Person.prototype.species = 'Homo Sapiens';
console.log(vagman, matilda);

console.log(vagman.hasOwnProperty('firstName')); // true
console.log(vagman.hasOwnProperty('species')); // false, it isn't implemented in the original object but inherited from the prototype property
