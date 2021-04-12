'use strict';
// Дата
let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

setInterval(function() {

  let date = new Date();

  let weekDays;
  week.forEach(function(item, i) {
    if(date.getDay() === i) {
      weekDays = week[i] + ', ';
    }
  });

  const sett = {
    day: 'numeric',
    month: 'long',
  };

  let year = date.getFullYear() + ' года, ';
  let hour = date.getHours();
  let minut = date.getMinutes() + ' минут ';
  let second = date.getSeconds() + ' секунды';
  const dayValue = function(v) {
    if(v === 1 || v === 21) {
      return v + ' час';
    } else if ((v >= 2 && v <= 4) || (v >= 22 && v <= 24)) {
      return v + ' часа';
    } else if (v >=5 && v <= 24 && v) {
      return v + ' часов';
    }
  };

  date = date.toLocaleString('ru', sett);

  date = `Сегодня ${weekDays} ${date} ${year} ${dayValue(hour)} ${minut}${second}`;
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