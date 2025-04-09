'use strict';

// Lecture 270: The Event Loop in Practice
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);

Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2.').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');

// In what order will these 4 messages above, get printed ?
// Answer: Test start,  Test end, Resolved promise 1, Resolved promise 2, 0 sec timer✅
