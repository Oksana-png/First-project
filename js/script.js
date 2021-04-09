'Use strict';

let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

let data = new Date();
data = data.getDay();
console.log(data);
week.forEach(function(item, i) {
  if(i === data) {
    document.querySelector('body').innerHTML += `<b>${item}</b><br>`;
  } else if(i > 4) {
    document.querySelector('body').innerHTML += `<i>${item}</i><br>`;
  } else if(i > 4 && i === data) {
    document.querySelector('body').innerHTML += `<b><i>${item}</i></b><br>`;
  }
  else {
    document.querySelector('body').innerHTML += `${item}<br>`;
  }
});