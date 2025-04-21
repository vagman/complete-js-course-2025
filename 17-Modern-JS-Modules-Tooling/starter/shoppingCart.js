// Exporting Module
console.log('Exporting module');

// Blocking code
// console.log('Start fetching users...');
// fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching usrers...');

const shippingCost = 10;
export const cart = [];

// Exports need to happen in top-level code. The code below wouldn't work:
// if (true) {
//   export const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart.`);
//   };
// }
// Uncaught SyntaxError: Unexpected token 'export' (at shoppingCart.js:9:3)

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart.`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as quantity };

// Default Exports: exporting only 1 thing from the module
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart.`);
}
