'use strict';

const proposal = '   1451236345 Вам дали другое задание и ушли    ';

const str = function(data) {
  if(typeof data !== 'string') {
    console.log('Это не строка! Исполнение функции завершено.');
    return;
  }
  
  data = data.trim();
  
  if(data.length > 30) {
    console.log(data.slice(0, 29) + '...');
  }
};

str(proposal);