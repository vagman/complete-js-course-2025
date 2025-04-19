'use strict';

/* 
Coding Challenge #3

Go browser --> Network tab --> check Disable cache & set "No throttling" to "Slow 4G".

PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

GOOD LUCK 😀
*/

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgCaontainer = document.querySelector('.images');

// Part 1
const createImage = async function (imgPath) {
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

const loadNPause = async function () {
  try {
    // Load image #1
    let currentImgAsync = await createImage('img/img-1.jpg');
    console.log(`Image #1 loaded!`);
    await wait(2);
    currentImgAsync.style.display = 'none';
    console.log('Image #1 hidden');

    // Load image #2
    currentImgAsync = await createImage('img/img-2.jpg');
    console.log(`Image #2 loaded!`);
    await wait(2);
    console.log('Image #2 hidden');
    currentImgAsync.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
};
// loadNPause();

/*
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.
*/

// 1
const loadAll = async function (imgArr) {
  try {
    // Add Loading animation for better UX
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    document.body.appendChild(spinner);

    // 2
    const imgs = imgArr.map(async image => await createImage(image));

    // 3
    console.log(imgs);

    // 4
    const imgElements = await Promise.all(imgs);

    // 5 + Removing loading spinner
    document.body.removeChild(spinner);
    imgElements.forEach(image => image.classList.add('parallel'));
  } catch (error) {
    console.error(`Error: ${error} 💥`);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
