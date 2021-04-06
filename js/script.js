'use strict';

let money = +prompt('Ваш месячный доход?'); // ДОХОД
let income = 'маникюрчик';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 10000;
let period = 3;

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
// Сумма всех обязательных расходов
const getExpensesMonth = function() {
  return amount1 + amount2;
};
// Накопления за месяц (доходы - расходы)
const getAccumulatedMonth = function() {
  return money - getExpensesMonth();
};

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
  return mission / accumulatedMonth;
};

let budgetDay = Math.floor((accumulatedMonth / 30));

const showTypeOf = function(data) {
  return typeof(data);
};
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log('Расходы за месяц: ' + getExpensesMonth());
console.log('Возможные расходы: ' + addExpenses);
console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев(-а)');
console.log('Бюджет на день: ' + budgetDay);

const getStatusIncome = function() {
  switch (true) {
    case budgetDay >= 1200:
      return ('У вас высокий уровень дохода');
      
    case budgetDay >= 600 && budgetDay < 1200:
      return ('У вас средний уровень дохода');
      
    case budgetDay < 600 && budgetDay >= 0:
      return ('К сожалению у вас уровень дохода ниже среднего');
      
    case budgetDay < 0:
      return ('Что то пошло не так');
      
  }
};
console.log(getStatusIncome());