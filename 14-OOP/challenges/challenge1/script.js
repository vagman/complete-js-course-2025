'use strict';

// Coding Challenge #1
/* 
DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
GOOD LUCK 😀
*/

/*
    1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
*/
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

/*
    2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
*/
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h.`);
};

/*
    3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
*/
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h.`);
};

/*
    4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
*/
const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car1.accelerate();
car1.accelerate();
car1.brake();
car1.accelerate();
