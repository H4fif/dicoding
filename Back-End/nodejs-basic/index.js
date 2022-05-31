// const cpuInformation = process.memoryUsage();

// console.log(cpuInformation);

// // const firstName = process.argv[2];
// // const lastName = process.argv[3];

// // console.log(`Hello ${firstName} ${lastName}`);

const moment = require('moment');

const date = moment().format('MMM Do YY');
console.log(date);

/**
 * output:
 * Jan 11th 21
 */
