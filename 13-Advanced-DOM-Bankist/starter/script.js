'use strict';

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
