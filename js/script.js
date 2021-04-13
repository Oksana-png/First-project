'use strict';
// Дата
let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
// Функция принимает число и массив с нужными значениями (склонения чисел)
// Идет проверка, если число меньше 20 и % 4 
function determinEnd (number, txt) {
  let cases = [2, 0, 1, 1, 1, 2];
  return number + ' ' + txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

setInterval(function() {
  let date = new Date();

  let weekDays;
  week.forEach(function(item, i) {
    if(date.getDay() === i) {
      weekDays = item + ', ';
    }
  });

  const sett = {
    day: 'numeric',
    month: 'long',
  };

  let year = date.getFullYear() + ' года, ';
  let hour = date.getHours();
  let minut = date.getMinutes();
  let second = date.getSeconds();
  hour = determinEnd(hour, ['час', 'часа', 'часов']);
  minut = determinEnd(minut, ['минута', 'минуты', 'минут']);
  second = determinEnd(second, ['секунда', 'секунды', 'секунд']);

  date = date.toLocaleString('ru', sett);

  date = `Сегодня ${weekDays} ${date} ${year} ${hour} ${minut} ${second}`;
  document.querySelector('h1').innerHTML = '';
  document.querySelector('h1').innerHTML += '<br><br>' + date;

}, 1000);

setInterval(function() {
  let dateShort = new Date();
  const settShort = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const settTime = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  
  document.querySelector('.date').innerHTML = '';
  document.querySelector('.date').innerHTML += dateShort.toLocaleString('ru', settShort) + ' - ' + dateShort.toLocaleString('ru', settTime);

}, 1000);

