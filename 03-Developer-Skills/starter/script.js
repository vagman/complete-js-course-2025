'use strict';

// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

const tempData = [17, 21, 23];

// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];

/*
Let's say you're building a time tracking application for freelancers. At some point in building this app, you need a function that receives daily work hours for a certain week, and returns:
1. Total hours worked
2. Average daily hours
3. The day with the most hours worked
4. Number of days worked
5. Whether the week was full-time (worked 35 hours or more)

TEST DATA: [7.5, 8, 6.5, 0, 8.5, 4, 0]
*/

function freelanceCalculator(dailyWorkHours) {
    // 1. Total hours worked
    let totalHours = 0;
    for (let i = 0; i < dailyWorkHours.length; i++) {
        totalHours += dailyWorkHours[i];
    }

    // 2. Average daily hours
    const weeklyAverage = Math.round(totalHours / 7);

    // 3. The day with the most hours worked
    let maxHours = 0;
    for (let i = 0; i <= dailyWorkHours.length; i++) {
        if (maxHours < dailyWorkHours[i]) {
            maxHours = dailyWorkHours[i];
        }
    }

    // 4. Number of days worked
    let workDays = 0;
    for (let i = 0; i <= dailyWorkHours.length; i++) {
        if (dailyWorkHours[i] > 0) {
            workDays++;
        }
    }

    // 5. Whether the week was full - time(worked 35 hours or more)
    const fullTime = true ? totalHours >= 35 : false;

    return `Total hours worked: ${totalHours}\nAverage: ${weeklyAverage} hours/day\nThe most working hours in one day were: ${maxHours}\nTotal days worked: ${workDays}\nThe week was a full-time: ${fullTime}\n`
}

console.log(freelanceCalculator([7.5, 8, 6.5, 0, 8.5, 4, 0]));






















