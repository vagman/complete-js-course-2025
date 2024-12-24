"use strict";

/*
    Functions

    Write a function called describeCountry which takes three parameters: country, population and capitalCity. Based on this input, the function returns a string with this format: 'Finland has 6 million people and its capital city is Helsinki'.
    Call this function 3 times, with input data for 3 different countries. Store the returned values in 3 different variables, and log them to the console.
*/
let country, population, capitalCity;
function describeCountry(country, population, capitalCity) {
    console.log(`${country} has ${population} million people and its capital city is ${capitalCity}.`);
}

describeCountry('Greece', 10, 'Athens');
describeCountry('Turkey', 30, 'Instanbul');
describeCountry('United States', 335, 'Washington, D.C');

/*
    Function Declarations vs. Expressions

    The world population is 7900 million people. Create a function declaration called percentageOfWorld1 which receives a population value, and returns the percentage of the world population that the given population represents. For example, China has 1441 million people, so it's about 18.2% of the world population.
    To calculate the percentage, divide the given population value by 7900 and then multiply by 100.Call percentageOfWorld1 for 3 populations of countries of your choice, store the results into variables, and log them to the console.
    Create a function expression which does the exact same thing, called percentageOfWolrd2, and also call it with 3 country populations (can be the same populations). 
*/

function percentageOfWorld1(population) {
    return ((population / 7900) * 100).toFixed(2);
}

const chinaPercentage = percentageOfWorld1(1441)
const usPercentage = percentageOfWorld1(335);
const greekPercentage = percentageOfWorld1(10);

console.log(chinaPercentage, usPercentage, greekPercentage);

const percentageOfWorld2 = function (population) {
    return ((population / 7900) * 100).toFixed(2);
}

const chinaPercentage1 = percentageOfWorld2(1441)
const usPercentage1 = percentageOfWorld2(335);
const greekPercentage1 = percentageOfWorld2(10);

console.log(chinaPercentage1, usPercentage1, greekPercentage1);

/*
    Arrow Functions

    Recreate the last assignment, but this time create an arrow function called percentageOfWorld3.
*/

const percentageOfWorld3 = (population) => (population / 7900) * 100;

const chinaPercentage3 = percentageOfWorld2(1441)
const usPercentage3 = percentageOfWorld2(335);
const greekPercentage3 = percentageOfWorld2(10);

console.log(chinaPercentage3, greekPercentage3, usPercentage3);

/*
    Functions Calling Other Functions

    Create a function called describePopulation. Use the function type you like the most. This function takes in two arguments: country and population, and returns a strings like this: 'China has 1441 million people, which is about 18.2% of the world'.
    To calculate the percentage, describePopulation calls the percentageOfWorld1 you created earlier.
    Call describePopulation with data for 3 countries of your choice.
*/


// function describePopulation(country, population) {
//     const percentage = percentageOfWorld1(population);
//     const description = `${country} has ${population} million people, which is about ${percentage}% of the world.`;
//     return description;
// }

function describePopulation(country, population) {
    return `${country} has ${population} million people, which is about ${(population / 7900 * 100).toFixed(2)}% of the world.`;
}

console.log(describePopulation('Greece', 10));
console.log(describePopulation('United States', 335));
console.log(describePopulation('China', 1441));

/*
    Introduction to Arrays

    Create an array containing 4 population values of 4 countries of your choice. You may use the values you have been using previously. Store this array into a variable called populations.
    Log to the console whether the array has 4 elements or not (true or false).
    Create an array called percentages containing the percentages of the world population for these 4 population values. Use the function percentageOfWorld1 that you created earlier to compute the 4 percentage values.
*/

const populations = [10, 1441, 335, 10];
const percentages = [];
console.log(populations.length === 4);
for (let i = 0; i < populations.length; i++) {
    percentages[i] = percentageOfWorld1(populations[i]);
}
console.log(percentages);

/*
    asic Array Operations (Methods)

    Create an array containing all the neighbouring countries of a country of your choice. Choose a country which has at least 2 or 3 neighbours. Store the array into a variable called neighbours. At some point, a new country called 'Utopia' is created in the neighbourhood of your selected country, so add it to the end of the neighbours array.
    Unfortunately, after some time the new country is dissolved, so remove it from the end of the array. If the neighbours array does not include the country 'Germany', log to the console: 'Probably not a central european country :D'. Change the name of one of your neighbouring countries. To do that, find the index of the country in the neighbours array, and then use that index to change the array at that index position. For example, you can search for 'Sweden' in the array, and then replace it with 'Republic of Sweden'.
*/

const neighbours = ['Turkey', 'Albania', 'Bulgaria'];
neighbours.push('Utopia');
neighbours.pop();
if (!neighbours.includes('Germany')) {
    console.log('Probably not a central European country :D');
}
neighbours[neighbours.indexOf('Albania')] = 'Republic of Albania';
console.log(neighbours);

/*
    Introduction to Objects

    Create an object called myCountry for a country of your choice, containing properties country, capital, language, population and neighbours(an array like we used in previous assignments).
*/

const myCountry = {
    country: 'Greece',
    capital: 'Athens',
    language: 'Greek',
    population: 10,
    neighbours: ['Albania', 'Bulgaria', 'Turkey']
};

/*
    Dot vs. Bracket Notation

    Using the object from the previous assignment, log a string like this to the console: 'Finland has 6 million finnish-speaking people, 3 neighbouring countries and a capital called Helsinki'. Increase the country's population by two million using dot notation, and then decrease it by two million using bracket notation.
*/

console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}.`);

myCountry.population += 2;
console.log(myCountry.population);

myCountry["population"] -= 2;
console.log(myCountry["population"]);

/*
    Object Methods

    Add a method called describe to the myCountry object. This method will log a string to the console, similar to the string logged in the previous assignment, but this time using the 'this' keyword. Call the describe method. Add a method called checkIsland to the myCountry object. This method will set a new property on the object, called isIsland. isIsland will be true if there are no neighbouring countries, and false if there are. Use the ternary operator to set the property.
*/

myCountry['describe'] = function () {
    console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`)
};

myCountry["checkIsland"] = function () {
    myCountry["isIsland"] = myCountry["neighbours"].length === 0 ? true : false;
};

myCountry.describe();
myCountry.checkIsland();
console.log(myCountry.isIsland);

/*
    Iteration: The for Loop

    There are elections in your country! in a small town, there are only 50 voters. Use a for loop to simulate the 50 people voting, by logging a string like this to the console (for numbers 1 to 50): 'Voter number 1 is currently voting'.
*/

for (let voter = 1; voter <= 50; voter++) {
    console.log(`Voter number ${voter} is currently voting.`)
}

/*
    Looping Arrays, Breaking and Continuing

    Let's bring back the populations array from a previous assignment. Use a for loop to compute an array called percentages2 containing the percentages of the world population for the 4 population values. Use the function percentageWOrld1 that you created earlier. Confirm that percentages2 contains exactly the same values as the percentages array that we created manually in the previous assignment, and reflect on how much better this solution is.
*/

const percentages2 = [];
for (let i = 0; i < populations.length; i++) {
    percentages2[i] = percentageOfWorld1(populations[i]);
}
console.log(percentages2);

/*
    Looping Backwards and Loops in Loops

    Store this array of arrays into a variable called listOfNeighbours:[['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']]; Log only the neighbouring countries to the console, one by one, not the entire arrays. Log a string like 'Neighbour: Canada' for each country. You will need a loop inside a loop for this. This is actually a bit tricky, so don't worry if it's too difficult for you! But you can still try to figure this out anyway 😉
*/

const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];

for (let country = 0; country < listOfNeighbours.length; country++) {
    for (let innerCountry = 0; innerCountry < listOfNeighbours[country].length; innerCountry++) {
        // TODO: Displaying a 1D array from a nested array 
        console.log(`Neighbour: ${listOfNeighbours[country][innerCountry]}`);
    }
}

/*
    The while Loop

    Recreate the challenge from the lecture Looping Arrays, Breaking and Continuing, but this time using a while loop (call the array percentages3). Reflect on what solution you like better for this task: the for loop or the while loop?
*/

const percentages3 = []
let i = 0;
while (i < populations.length) {
    percentages3.push(percentageOfWorld1(populations[i]));
    i++;
}
console.log(percentages3);