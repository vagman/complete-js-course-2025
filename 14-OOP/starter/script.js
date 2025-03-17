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

// Lectu§ 222: Prototypal Inheritance on Built-in Objects
// Deprecated __proto__ property
console.log(vagman.__proto__);

// New property used in modern JS
console.log(Object.getPrototypeOf(vagman));

console.log(vagman.__proto__.__proto__); // Top of prototype chain: Object.prototype
console.log(vagman.__proto__.__proto__.__proto__); // null

console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9];
console.log(arr.__proto__); // Array
console.log(Array.prototype); // Array
console.log(arr.__proto__ === Array.prototype); // true

console.log(arr.__proto__.__proto__); // Object

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1); // [[Prototype]]: HTMLHeadingElement
console.dir(h1.__proto__); // HTMLHeadingElement
console.dir(h1.__proto__.__proto__); // HTMLElement
console.dir(h1.__proto__.__proto__.__proto__); // Element
console.dir(h1.__proto__.__proto__.__proto__.__proto__); // Node
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // Object
console.dir(
  h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
); // null - end of prototype chain

console.dir(x => x + 1);
