let money = +prompt('Ваш месячный доход?'); // ДОХОД
let income = 'маникюрчик';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 10000;
let period = 3;

let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');

let amount1 = +prompt('Во сколько это обойдется?');
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = amount1 + amount2; // Бюджет за месяц
let budgetDay = Math.floor((budgetMonth / 30));


alert('Первый урок какой-то легкий, подозрительно');
console.log('И сюда напишем что-нибудь');

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log('Длина строки addExpenses: ', addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log((addExpenses.toLowerCase()).split(', '));

console.log('Бюджет на месяц: ' + budgetMonth);
console.log('Цель будет достигнута за ' + Math.round(mission /(money - budgetMonth)) + ' месяцев(-а)');

console.log('Бюджет на день: ' + budgetDay);

switch (true) {
  case budgetDay >= 1200:
    console.log('У вас высокий уровень дохода');
    break;
  case budgetDay >= 600:
    console.log('У вас средний уровень дохода');
    break;
  case budgetDay < 600 && budgetDay >= 0:
    console.log('К сожалению у вас уровень дохода ниже среднего');
    break;
  case budgetDay < 0:
    console.log('Что то пошло не так');
    break;
}