let lang = 'ru';

// через if 
if (lang === 'ru') {
  console.log('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} else if (lang === 'en') {
  console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
} else {
  console.log('Такого языка не существует в базе!');
}

// Через switch-case
switch (lang) {
  case 'ru':
    console.log('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
    break;
  case 'en':
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
    break;
}

// Через Многомерный массив
let arr = ['ru', 'en'];
arr['ru'] = ['Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье'];
arr['en'] = ['Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'];

console.log(arr[lang]);

// второе задание
let namePerson = 'Максим';

(namePerson === 'Артем') ? console.log('директор') : (namePerson === 'Максим') ? console.log('преподаватель') : console.log('студент');