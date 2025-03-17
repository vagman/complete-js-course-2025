class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge = function () {
    console.log(2037 - this.brithYear);
  };
}

const jessica = new PersonCl('Jessica', 1996);

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

jessica.greet();
