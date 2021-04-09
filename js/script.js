'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money; 

let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));

  return +money;
};

let income = 'маникюрчик';

start();

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 10000;
let period = 3;


let expenses = [];
let amount = [];
// Сумма всех обязательных расходов ДОБАВИТЬ ПРОВЕРКУ НА ЧИСЛО
const getExpensesMonth = function() {
  let sum = 0;
  
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    
    do{
      amount[i] = prompt('Во сколько это обойдется?');  
    } while (!isNumber(amount[i]));
    
    sum += +amount[i];
  }
  return sum;
};

let expensesMonth = getExpensesMonth();


// Накопления за месяц (доходы - расходы)
const getAccumulatedMonth = function() {
  return money - expensesMonth;
};

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {

  const month = Math.round(mission / accumulatedMonth);
  if (month < 0) {
    return 'Цель не будет достигнута';
  } else {
    return 'Цель будет достигнута за ' + month + ' месяцев(-а)';
  }

};

let budgetDay = Math.floor((accumulatedMonth / 30));

const showTypeOf = function(data) {
  return typeof(data);
};
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log('Расходы за месяц: ' + expensesMonth);
console.log('Возможные расходы: ' + addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth());
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