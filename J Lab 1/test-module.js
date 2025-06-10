// import two functions from module.js
// call those functions here

import { addItem, getItemCount } from './module.js';

addItem('apple');
addItem('banana');
addItem('orange');

console.log(getItemCount()); // should show 3
