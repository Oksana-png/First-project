'use strict';

let arr = ['236504', '12246', '123', '4562', '9831', '2056', '49210'];

const checks = function(arrey) {
  for (let i = 0; i < arrey.length; i++) {
    if(arrey[i][0] === '2' || arrey[i][0] === '4') {
      console.log(arrey[i]);
    }
  }
};

checks(arr);

// Второе задание

for1: for (let i = 1; i <= 100; i++) {
  
  for (let j = 2; j < i - 1; j++) {
    if(i % j === 0) {
      continue for1;
    }

  }
  console.log(i);
}

