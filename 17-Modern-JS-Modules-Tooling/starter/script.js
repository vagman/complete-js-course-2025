// Importing module
// import { addToCart, totalPrice as price, quantity } from './shoppingCart.js';

// addToCart('bread', 5);
// console.log(
//   'Total price (from module export): ',
//   price,
//   '\nTotal quantity (from module export): ',
//   quantity
// );

// console.log(shippingCost);
// script.js:6 Uncaught ReferenceError: shippingCost is not defined - you cannot access module variables, their scope is module only!

// Create an object containing everything that is eported from the module
console.log('Importing module');

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// Import the default export and give it a name also (add)
// import add, {
//   addToCart,
//   totalPrice as price,
//   quantity,
// } from './shoppingCart.js';
import add, { cart, quantity } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);
// Imports are not copies of the exports. They are a live connection: pointing in the same place in memory.

// Lecture 285: Top-level await (ES2022)
// JSON placeholder API with fake data: https://jsonplaceholder.typicode.com/
// console.log('Start fetching');
// const result = await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log(result);
// const data = await result.json();
// console.log(data);
// console.log('Something');
// The method above which is using top-level await is blocking the entire module execution

const getLastPost = async function () {
  const result = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await result.json();
  // console.log(data);

  // return data[data.length - 1];
  return { title: data.at(-1).title, text: data.at(-1) };
};

const lastPost = getLastPost();
console.log(lastPost);

// Not very clean solution: use regular promise then()
// lastPost.then(lastPost => console.log(lastPost));

const lastPost1 = await getLastPost();
console.log(lastPost1);

// Lecture 286: The Module Pattern
// Step 1. Create an IIFE (Immidietly Invoked Function Expression)
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier.`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost);

// Lecture 287: CommonJS Modules
// The following code won't work in the browser but it would work in Node.js
// Exporting...
// exports.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//   );
// };

// Importing...
// const { addToCart } = require('./shoppingCart.js');
// "exports", "require", "module.exports" keywords are recopgnized by Node

// Lecture 289. introduction to NPM
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
const state = {
  cart: [
    { productr: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

console.log(stateClone);
state.user.loggedIn = false;
console.log(stateClone);

console.log('DeepClone: ', stateDeepClone);
