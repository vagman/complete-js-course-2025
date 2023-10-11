// LECTURE: Data Types
// const country = 'Greece';
// const continent = 'Europe';
// let population = 11000000;
// const isIsland = false;

// LECTURE: let, const and var
//language = 'Greek';

// console.log(country);
// console.log(continent);
// console.log(population);
// console.log(isIsland);
// console.log(language);

// LECTURE: Basic Operators
// let halfOfThePopulation = population / 2;
// console.log(halfOfThePopulation);
// console.log(population += 1);

// let finland_population = 6000000
// if (finland_population > population) {
//     console.log('Finland has more people than Greece.');
// } else {
//     console.log('Greece has more people than Finland.');
// }

// console.log(population < 33)

//const description = console.log(`${country} is in  ${continent} , and its ${population} million people speak ${language}`);
//console.log(description);
// LECTURE: Strings and Template Literals


// LECTURE: Taking Decisions: if / else Statements


// LECTURE: Type Conversion and Coercion
'9' - '5'; // 4
'19' - '13' + '17'; // 617
'19' - '13' + 17; // 23
'123' < 57; // false
5 + 6 + '4' + 9 - 4 - 2; // 1143

// LECTURE: Equality Operators: == vs. ===

// LECTURE: Type Conversion and Coercion


// Coding Challenge #1
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).

Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:

Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall
*/
const mark1Weight = 78;
const mark2Weight = 95;
const john1Weight = 92;
const john2Weight = 85;

const mark1Height = 1.69;
const mark2Height = 1.88;
const john1Height = 1.95;
const john2Height = 1.76;

const BMIJohn1 = john1Weight / john1Height ** 2;
const BMIJohn2 = john2Weight / john2Height ** 2;
const BMIMark1 = mark1Weight / mark1Height ** 2;
const BMIMark2 = mark2Weight / mark2Height ** 2;

console.log("Data1:\nMark's BMI = " + BMIMark1 + "\nJohn's BMI = " + BMIJohn1);
console.log("Data2:\nMark's BMI = " + BMIMark2 + "\nJohn's BMI = " + BMIJohn2);

const markHigherBMI1 = BMIMark1 > BMIJohn1;
const markHigherBMI2 = BMIMark2 > BMIJohn2;

console.log(markHigherBMI1);
console.log(markHigherBMI2);


// Coding Challenge #2
/*
Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, telling the user who has the higher BMI. The message can be either:
"Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!".

2. Modify the outputs above to use template literals to include the BMI values in the outputs.
Example: "Mark's BMI (28.3) is higher than John's (23.9)!" or "John's BMI (29.1) is higher than Mark's (27)!".
Note: Don't round the BMI values. Leave them as they are.
*/
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

/* Write your code below. Good luck! 🙂 */
if (BMIMark > BMIJohn) {
    console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
} else {
    console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
}

// Coding Challenge #3
/*
There are two gymnastics teams: Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
1. Calculate the average score for each team, using the test data included below. The average score for Dolphins should be assigned to the scoreDolphins variable, and the average score of Koalas should be assigned to the scoreKoalas variable.
2. Compare the team's average scores to determine the winner of the competition, and print to the console:
"Dolphins win the trophy" if Dolphins win, or
"Koalas win the trophy" if Koalas win, or
"Both win the trophy" if their average scores are equal.

TEST DATA: Dolphins scored 96, 108, and 89. Koalas scored 88, 91, and 110.
*/
const scoreDolphins = (96 + 108 + 89) / 3;
const scoreKoalas = (88 + 91 + 110) / 3;

if (scoreKoalas > scoreDolphins) {
    console.log('Koalas win the trophy');
} else if (scoreDolphins > scoreKoalas) {
    console.log('Dolphins win the trophy');
} else if (scoreDolphins === scoreKoalas) {
    console.log('Both win the trophy');
}


// Challenge 3.5 - Conver Switch cases to If statements
const day = 'ssunday';
if (day === 'monday') {
    console.log('Plan course structure');
    console.log('Go to coding meetup');
} else if (day === 'tuesday') {
    console.log('Prepare theory videos');
} else if (day === 'wednesday' || day === 'thursday') {
    console.log('Prepare code examples');
} else if (day === 'friday') {
    console.log('Record videos');
} else if (day === 'saturday' || day === 'sunday') {
    console.log('Enjoy the weekend :D')
} else {
    console.log('Not a valid day.')
}

/*
CHALLENGE #4

Steven needs a very simple tip calculator for whenever he goes to eat in a restaurant.
In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.

Your tasks:
1. Calculate the tip, depending on the bill value. Create a variable called tip for this.
It's not allowed to use an if...else statement (if it's easier for you, you can start with an if...else statement, 
and then try to convert it to a ternary operator).
2.Print a string to the console containing the bill value, the tip, and the final value (bill + tip).
Example: The bill was 275, the tip was 41.25, and the total value 316.25.
Note: Use the values of the bill and tip variables to construct this string. Don't hard-code them 🙂
TEST DATA: Test with different bill values: 275, 40, and 430
*/

const bill = 275;
const tip = bill <= 300 && bill >= 50 ? 0.15 * bill : 0.2 * bill;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);

