'use strict';

// Coding Challenge #1
console.log('-------- CHALLENGE #1 ---------');
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrect = dogsJulia.slice();
  dogsJuliaCorrect.splice(0, 1);
  dogsJuliaCorrect.splice(-2);
  // dogsJulia.slice(1, 3);
  const results = [...dogsJuliaCorrect, ...dogsKate];
  results.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old.`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶.`);
    }
  });
};
console.log('1st test data: ');
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('2nd test data: ');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// Coding Challenge #2
console.log('-------- CHALLENGE #2 ---------');
/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
const calcAverageHumanAge = function (ages) {
  // 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(`Dog years in human ages: ${humanAges}.`);
  // 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
  // 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
  const adults = humanAges.filter(humanAge => humanAge > 18);
  console.log(`Only the adult dogs in human years: ${adults}`);
  const averageAdult = adults.reduce(
    (sum, currentAge) => (sum += currentAge / adults.length),
    0
  );
  return averageAdult;
};

// 4. Run the function for both test datasets
console.log('Dog years: ', [5, 2, 4, 1, 15, 8, 3]);
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

console.log('-------- CHALLENGE #3 ---------');
/* Coding Challenge #3
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/
const calcAverageHumanAge1 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(humanAge => humanAge > 18)
    .reduce((acc, age, i, arr) => (acc += age / arr.length), 0);

console.log('Dog years: ', [5, 2, 4, 1, 15, 8, 3]);
const avg11 = calcAverageHumanAge1([5, 2, 4, 1, 15, 8, 3]);
const avg22 = calcAverageHumanAge1([16, 6, 10, 5, 6, 1, 4]);
console.log(avg11, avg22);

// Coding Challenge #4
console.log('----- CHALLENGE 4 ------');
/* 
This time, Julia and Kate are studying the activity levels of different dog breeds.
GOOD LUCK 😀
*/
// TEST DATA
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
const huskyWeight = breeds.find(dog => dog.breed === 'Husky').averageWeight;
console.log('The average weight of a Husky is: ', huskyWeight);

// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
const dogBothActivities = breeds.find(
  dog => dog.activities.includes('running') && dog.activities.includes('fetch')
).breed;
console.log(
  'The only breed that likes running and fetching is:',
  dogBothActivities
);

// 3. Create an array "allActivities" of all the activities of all the dog breeds
const allActivities = breeds.flatMap(dog => dog.activities);
console.log(allActivities);

// 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(dog => dog.activities.includes('swimming'))
      .flatMap(dog => dog.activities)
      .filter(act => act !== 'swimming')
  ),
];
console.log(swimmingAdjacent);

// 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
const isAverageDogWeight10KgOrMore =
  10 > breeds.every(breed => breed.averageWeight > 10);
console.log(
  'Is the average dog weight 10kg or more ?',
  isAverageDogWeight10KgOrMore
);

// 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".
const areThereActiveBreeds = breeds.some(dog => dog.activities.length >= 3);
console.log(
  'Is there any breed with 3 activities or more ?',
  areThereActiveBreeds
);

// BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
const fetchWeights = breeds
  .filter(breed => breed.activities.includes('fetch'))
  .map(breed => breed.averageWeight);
const heaviestFetchBreed = Math.max(...fetchWeights);

console.log(fetchWeights);
console.log(
  `The average weight of the heaviest breed is: ${heaviestFetchBreed}kg`
);

// Coding Challenge #5
console.log('----- Challenge #5 ------');
/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
GOOD LUCK 😀
*/

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array). Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
const sarahDog = String(
  dogs
    .filter(dog => dog.owners.includes('Sarah'))
    .map(
      dog =>
        `Sarah's dog is eating too ${
          dog.curFood > dog.recFood ? 'much.' : 'little.'
        }`
    )
);
console.log(sarahDog);

// 3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
const ownersTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
const ownersTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(
  'Dogs eating to much:',
  ownersTooMuch,
  '\nDogs eating to little',
  ownersTooLittle
);

// 4. Log a string to the console for each array created in 3rd question, like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersTooLittle.join(' and ')}'s dogs eat too little!`);

// 5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(
  'Do any dog eats exactly the reccomended amount of food ?',
  dogs.some(dog => dog.recFood === dog.curFood)
);

// 6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false). HINT: - Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint). Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
// My solution:
console.log(
  'Do all dogs eat an okay amount of food ?',
  dogs.every(
    dog =>
      dog.curFood * 0.1 + dog.curFood > dog.recFood &&
      dog.curFood * 0.1 + dog.curFood < dog.recFood
  )
);

// Reccomended solution:
// current > 90% of recommended && current < 110% of recommended
const checkEatingOkay = dog =>
  dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9;
console.log(dogs.every(checkEatingOkay));

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const dogsEatOkay = dogs.filter(checkEatingOkay);
console.log('Array of the dogs that eat okay: ', dogsEatOkay);

// 8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
const groupDogsByFood = Object.groupBy(dogs, dog => {
  if (dog.curFood > dog.recFood) {
    return 'too-much';
  } else if (dog.curFood < dog.recFood) {
    return 'too-little';
  } else {
  }
  return 'exact';
});
console.log(groupDogsByFood);

// 9. Group the dogs by the number of owners they have
const groupDogsByOwnersNumber = Object.groupBy(
  dogs,
  dog => `${dog.owners.length}-owners`
);
console.log('Dogs grouped by number of owners: ', groupDogsByOwnersNumber);

// 10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!
const sortDogsArray = dogs.toSorted((a, b) => a.recFood - b.recFood);
console.log(sortDogsArray);
