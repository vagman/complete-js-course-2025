'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!
GOOD LUCK 😀
*/

// 1. Loop over the game.scored array and print each player name to the console, 
// along with the goal number (Example: "Goal 1: Lewandowski")
for (const [key, player] of game.scored.entries()) {
  console.log(`Goal ${key + 1}: ${player}`);
}

// 2. Use a loop to calculate the average odd and log it to 
// the console (We already studied how to calculate averages, 
// you can go check if you don't remember)
// const odds = Object.entries(game.odds);
const odds = Object.values(game.odds);
let sum = 0;
for (const odd of odds) {
  sum += odd;
}
console.log(`The average odd of the game is ${(sum / odds.length).toFixed(2)}`);

// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
// Odd of victory Bayern Munich: 1.33 
// Odd of draw: 3.25 
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw").
// HINT: Note how the odds and the game objects have the same property names 😉
console.log();
for (const [team ,odd] of Object.entries(game.odds)) {
  const teamString = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamString}: ${odd}`);
}

/*
BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties,
and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }
Solution can be found in  09-Data-Structures-Operators > final > script.js
*/

const scorers = {};
for (const player of game.scored) {
  if (scorers[player]) {
    scorers[player]++;
  } else {
    scorers[player] = 1;
  }
}
console.log(scorers);

// Jonas' solution: So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers1 = {};
for (const player1 of game.scored) {
  scorers1[player1] ? scorers1[player1]++ : scorers1[player1] = 1;
}
console.log(scorers1);
