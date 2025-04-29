// Here we will store all the functions we use over and over again across the project

import { TIMEOUT_SEC } from './config.js';

// 0. Timeout function in order to make the example more real world
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// 1. Function that will get our JSON after fetching data
export const getJSON = async url => {
  try {
    // TODO: Fix error when the API fetch fails and the function doesn;t return but instead keep running: ERROR: TypeError: Cannot read properties of undefined (reading 'map')
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    // The promise that is being returned from getJSON() will actually reject by throwing a new error here. Therefore we will be able to handle the error inside model.js/loadRecipe() catch block
    throw error;
  }
};
