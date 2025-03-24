'use strict';

class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
}

class Student extends Person {
  university = 'University of Piraeus';
  #studyHours = 0;
  #course;
  static numberOfSubjects = 10;

  constructor(fullName, birthYear, startYear, course) {
    super(fullName, birthYear);
    this.startYear = startYear;
    this.course = course;
  }

  introduce() {
    console.log(`I study ${this.#course} at ${this.university}.`);
  }

  study(hours) {
    this.#makeCoffee();
    this.#studyHours += hours;
  }

  #makeCoffee() {
    return 'Here is a coffee for you! ☕️';
  }

  set testScore(score) {
    this._testScore = score <= 20 ? score : 0;
  }

  static printCurriculum() {
    console.log(`There are ${this.numberOfSubjects} subjects.`);
  }
}

const student = new Student('Vaggelis', 2020, 2037, 'Informatics');
