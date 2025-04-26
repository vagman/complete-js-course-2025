*Section 16, Lecture 294* 
## Declarative and Functional JavaScript Principles

### 1. Imperative vs Declarative Code

Imperative code is when a programmer explains **how to do** things by giving the computer every single step it has to follow in order to achieve a result, e.g., a step-by-step recipe on how to make a cake.
```js
const arr = [2, 4, 6, 8];
const doubled = [];
for (let i = 0; i < arr.length; i++) 
    doubled[i] = arr[i] * 2;
```

Declarative code is when a programmer only tells the computer **what to do** by describing the way the computer should achieve the result. The "how" (step-by-step instructions) gets abstracted away. e.g. description of a cake.

```js
const arr = [2, 4, 6, 8];
const dpoubled = arr.map(number => number * 2);
```

### 2. Functional Programming
* <ins>Functional programming</ins>: is a declerative paradigm which is based on the idea of writing software by combining many **pure functions**, avoiding **side effects** and **mutaiting** data.

* <ins>Side effect</ins>: is a modification (mutation) of any data **outside** of the function (mutating external variables, logging to console, wirting to DOM, etc.)

* <ins>Pure function</ins>: is a function without the side effects. Does not depend on external variables. **Given the same inputs, always returns the same outputs.**

* <ins>Immutability</ins>: the ability not to mutate data as functional programming proposes. State (data) is **never modified!** Instead, state is **copied** and the copy is mutated and returned.  

### 3. Functional Programming techniques
* Try avoiding data mutations
* Use buildt-in methods that don't produce side effects
* Do data transformations with methods such as `.map()`, `.filter()` and `.reduce()`.
* Try avoiding side effects in functions: this is of course not always possible.

### 4. Declerative syntax
* Use array and object destructuring
* Use the spread operator (`...`)
* Use the ternary (conditional) operator
* use template literals (`Hello ${username}`)

### 5. Example 
A quick that violates functional programming:

```js
// Mutable external variable
let numbers = [1, 2, 3];

function addNumber(num) {
  numbers.push(num); // Mutates the external array
  return numbers;
}
```

#### Usage
```js
addNumber(4);
console.log(numbers); // [1, 2, 3, 4]
```
What's wrong here? Side effect: Changes numbers outside the function. Mutation: push() modifies the original array.

✅ Fixed version using functional programming

```js
function addNumber(numbers, num) {
  return [...numbers, num]; // Returns a new array
}
```
#### Usage
```js
const originalNumbers = [1, 2, 3];
const newNumbers = addNumber(originalNumbers, 4);

console.log(originalNumbers); // [1, 2, 3] (unchanged)
console.log(newNumbers);      // [1, 2, 3, 4] (new array)
```
🔎 Why is this functional?

Pure function: Only depends on its inputs. No mutation: originalNumbers stays the same. No side effects: Doesn't touch anything outside itself.