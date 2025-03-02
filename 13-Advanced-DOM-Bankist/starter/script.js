'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // x (top), y (left) = distance of the element from the left and top of the browser window
  console.log(e.target.getBoundingClientRect());
  // Deprecation:
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // More modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////
// Page Navigation

// document.querySelectorAll('.nav__links').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event delegations VS the above solution
// Step 1. Add event listener to commong parent element
// Step 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////

// Lecture 196: Selecting, Creating, and Deleting Elements
// Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');

console.log(allButtons); // Returns a HTMLcollection

console.log(document.getElementsByClassName('btn'));

// Creating & Inserting Elements
// .insertAdjacentHTML --> Bankist app Section 12
const message = document.createElement('div');
message.classList.add('cookie-message'); // CSS Class from style.css
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

// Deleting Elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // Old way of deleting elements
    // message.parentElement.removeChild(message);
  });

// Lecture 197: Styles, Attributes and Classes
// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// Not found although it is in style.css
console.log(message.style.color);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).color); // Computed in CSS file
console.log(getComputedStyle(message).height);

// Add 40pc to the cookie modal
message.style.height =
  Number.parseInt(getComputedStyle(message).height) + 40 + 'px';
console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log('Absolute URL: ', logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard element attributes
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log('Relative URL: ', logo.getAttribute('src'));
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attroibutes: Always starts with 'data-' in HTML
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // Be careful: X .includes()

// DO NOT use this - It will override all the existing classes
logo.className = 'Jonas';
// Lecture 198: Implementing Smooth Scrolling

// Lecture 199: Types of Events and Event Handlers
const h1 = document.querySelector('h1');

// Remove EventListener once and then remove it
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// Old way - not used anymore
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// Lecture 201: Event Propagation in Practise
// rgb(255, 255, 255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // Stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

// Lecture 202: Event delegation. Implemeting page navigation
// Lecture 203: DOM Traversing
const h01 = document.querySelector('h1');

// Going downwrads (selecting child elements)...
console.log(h01.querySelectorAll('.highlight'));
console.log(h01.childNodes);
console.log(h01.children); // Only works for direct children
h01.firstElementChild.style.color = 'white';
h01.lastElementChild.style.color = 'orangered';

// Going upwards (selecting parent elements)
console.log(h01.parentNode.parentNode.parentNode.parentNode.parentNode);
h01.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sideways (selecting siblings)...
// We can only get to the previous and the next one
console.log(h01.previousElementSibling); // null - doesnt have previous
console.log(h01.nextElementSibling); // <h4>

console.log(h01.previousSibling);
console.log(h01.nextSibling);

// Trick for getting all the siblings: Going to parents and finding all children elements
console.log(h01.parentElement.children);
[...h01.parentElement.children].forEach(el => {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
