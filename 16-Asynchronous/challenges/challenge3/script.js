'use strict';

/* 
Coding Challenge #3

Go browser --> Network tab --> check Disable cache & set "No throttling" to "Slow 4G".

PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

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
