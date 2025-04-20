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
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);
