'use strict';

let o1 = 1;
let o2 = 2;
var obj = {};
Object.assign(obj,{o1,o2},obj);
obj = JSON.stringify(obj);
console.log(obj);