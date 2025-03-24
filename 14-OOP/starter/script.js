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

Person.prototype.calcAge = function () {
  console.log(2037 - this.brithYear);
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

// Lecture 224: ES6 Classes
console.log('------ Lecture 224: ES6 Classes -------');
// Class expression - in reality it's a function (in JS classes aresyntactic sugar)
// const PersonCl = class {};

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Prototypal Inheritance: This method will be in the prototype of the object and not the object itself
  // Summary: calcAge will be added in .prototype property of the PersonCl class
  // Instance method: will be transfered to all Class objects
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    // Convention to avoid same name with setter()
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there ! 👋');
    console.log(this); // entire Person constructor function
  }
}
// .this keyword points to the Class
PersonCl.hey();

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();

console.log('Jessica age:', jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// Same as initializing it inside class, above
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// Important Notes
// 1. Classes are NOT hoisted - cannot be used before declaration
// 2. Classes are first-class citizens: we can pass them into functions and return them from functions as they are functions themselves (remember --> syntactic sugar not like Java)
// 3. Body of a class is always executed in 'use strict' modeg

const walter = new PersonCl('Walter White', 1965);

// Lecture 225: Setter & Getters
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latestMovement() {
    return this.movements.slice(-1).pop();
  },

  set latestMovement(movement) {
    this.movements.push(movement);
  },
};

// Property not calling method !
console.log(account.latestMovement);
account.latestMovement = 212;
console.log(account.movements);

account.age = 13;
console.log(account);

// Lecture 226: Static Methods
// Note: Static method is a method chained on the Class constructor e.g. Number.parseFloat(12) on Number class. It cannot be used like this: 12.parseFloat()

Person.hey = function () {
  console.log('Hey there ! 👋');
  console.log(this); // .this keyword point to the entire Person constructor function
};

Person.hey();
// vagman.hey(); // vagman.hey is not a function, it's static to Person constructor

// Lecture 227: Object.create()
const PersonPrototype = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonPrototype);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonPrototype);

const sarah = Object.create(PersonPrototype);
sarah.init('Sarah', 1979);
sarah.calcAge();

// Lecture 299: Inheritance between Classes Constructor Functions
const Person1 = function (firstName, brithYear) {
  this.firstName = firstName;
  this.brithYear = brithYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.brithYear);
};

const Student = function (firstName, birthYear, course) {
  Person1.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// Lecture 231: Inheritance betweeen "Classes": ES6 Classes
// extend heyword + super()
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // super() always needs to be called first !!!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}.`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

// Lecture 232: Inheritance Between "Classes": Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven1 = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

// Lecture 233: Another Class example
// Lecture 234: Encapsulation: Private Class Fields and Methods

// 1) Public fields: it will be in all class instances (objects) but NOT on the prototype - will NOT get inherited. It's the same as adding properties inside the constructor
// 2) Private fields
// 3) Public methods
// 4) Private methods
// STATIC version of these 4

class Account {
  locale = navigator.language;
  bank = 'Bankist';
  // Private property
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this.movements = [];
    // this.bank = 'Bankist';
    // this.locale = navigator.language;
    console.log(`Thanks for opening an account ${owner}`);
  }

  // Public Interface of our Object (API)
  getMovements() {
    // Not chainable method: movements[] is returned and we cannot return the object too
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    return this;
  }

  withdraw(value) {
    this.deposit(-value);
    return this;
  }

  #approveLoan(value) {
    // Fake method at the moment
    return true;
  }

  requestLoan(value) {
    if (this.#approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan for ${value} approved.`);
      return this;
    }
  }

  static #test() {
    console.log('TEST');
  }
}

const account1 = new Account('Jonas', 'EUR', 1111);
console.log(account1);

// Account.#test();

// NOT RECOMMENDED to interfere with object properties like this
// Deposit..
// account1.movements.push(250);
// Withdrawal..
// account1.movements.push(-140);

// Create methods that interact with these properties instead !
account1.deposit(250);
account1.withdraw(140);
account1.requestLoan(1000);

const movements = account1
  .deposit(300)
  .withdraw(100)
  .withdraw(50)
  .requestLoan(25000)
  .withdraw(4000)
  .getMovements();

console.log(movements);
// Data encapsulation & data privacy
// This function MUST be encaplusated for Security and Privacy reasons
// account1.#approveLoan(1000); // Does not work - only request method can call it.

console.log(account1);
console.log(account1.pin);

// Testing encapsultion for better security and privacy
account1.movements = [];
// It worked ^^ that's not good ! solution: #movements[]
console.log(account1);
console.log(account);

// Trying to access private method..
// account1.#approveLoan(323);
