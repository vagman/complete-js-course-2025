'use strict';

// Coding Challenge #2
/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise. If this part is too tricky for you, just watch the first part of the solution.

PART 2
2.1 Comsume the promise using .then and also add an error handler;
2.2 After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
2.3. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
2.4 After the second image has loaded, pause execution for 2 seconds again;
2.5 After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network (Inspect --> Network --> set network speed to: Fast 4G) speed to 'Fast 4G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgCaontainer = document.querySelector('.images');

// Part 1
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgCaontainer.appendChild(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error(`Image with path ${imgPath} failed to load.`));
    });
  });
};

let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    // 2.1 Consuming promise
    currentImg = img;
    console.log(`Image #1 loaded!`);

    // Pause execution for 2 sec
    return wait(2);
  })
  .then(() => {
    // 2.2, 2.3 wait() doesn't return anything so no arguements to be used here
    currentImg.style.display = 'none';
    console.log('Image #1 hidden');
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    // 2.3 Consuming new promise
    currentImg = img;
    console.log(`Image #2 loaded!`);
    return wait(2);
  })
  .then(() => {
    // 2.4 Hide image #2
    currentImg.style.display = 'none';
    console.log('Image #2 hidden');
  })
  .catch(error => console.error(error));
