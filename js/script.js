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

start();

let appData = {
  budget: money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 10000,
  period: 3,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  month: 0,

  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      addExpenses = addExpenses.toLowerCase().split(', ');
      appData.addExpenses = addExpenses;
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let key = prompt('Введите обязательную статью расходов?');
      do{
        appData.expenses[key] = prompt('Во сколько это обойдется?');  
      } while (!isNumber(appData.expenses[key]));
      appData.expenses[key] = parseFloat(appData.expenses[key]);
    }
  },

  // Сумма всех обязательных расходов
  getExpensesMonth: function() {
    for(let i in appData.expenses) {
      appData.expensesMonth += appData.expenses[i];
    }
  },

  // Накопления за месяц (доходы - расходы)
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor((appData.budgetMonth / 30));
  },

  getTargetMonth: function() {
    appData.month = Math.round(appData.mission / appData.budgetMonth);
    if (appData.month < 0) {
      return 'Цель не будет достигнута';
    } else {
      return 'Цель будет достигнута за ' + appData.month + ' месяцев(-а)';
    }
  },

  getStatusIncome: function() {
    switch (true) {
      case appData.budgetDay >= 1200:
        return ('У вас высокий уровень дохода');
      case appData.budgetDay >= 600 && appData.budgetDay < 1200:
        return ('У вас средний уровень дохода');
      case appData.budgetDay < 600 && appData.budgetDay >= 0:
        return ('К сожалению у вас уровень дохода ниже среднего');
      case appData.budgetDay < 0:
        return ('Что то пошло не так');
    }
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Цель будет достигнута за: ' + appData.month + ' месяц');
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for(let key in appData) {
  console.log(key + ' - ' + appData[key]);
}