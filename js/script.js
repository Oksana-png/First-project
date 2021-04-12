'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let isStr = function(str) {
  if (isNaN(+str)) { // Когда не число - true
    return false;
  } else {
    return true;
  }
};

let money; 
const buttonCalc = document.getElementById('start');
const buttonPlusIncom = document.getElementsByTagName('button')[0];
const buttonPlusExpenses = document.getElementsByTagName('button')[1];
const depositCheckbox = document.querySelector('.deposit-checkmark');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const budgetMonthValue = document.querySelector('.budget_month-value');
const periodRange = document.querySelector('.period-select');

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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 10000,
  period: 3,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  month: 0,

  asking: function() {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome,
          cashIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?');
      } while (isStr(itemIncome));

      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      addExpenses = addExpenses.toLowerCase().split(', ');
      appData.addExpenses = addExpenses;

    for (let i = 0; i < 2; i++) {
      let key;
      do {
        key = prompt('Введите обязательную статью расходов?');
      } while (isStr(key));
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

  getInfoDeposit: function() {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?');
      } while(!isNumber(appData.percentDeposit));

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?');
      } while(!isNumber(appData.moneyDeposit));
      
    }
  },

  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
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

// Вывод массива через запятую с пробелом и каждая буква элемента с большой буквы
let addExpensesUpper = [];
appData.addExpenses.forEach(function(item) {
  let character = item[0].toUpperCase();
  let word = item.slice(1);
  addExpensesUpper.push(character + word);
});

console.log(addExpensesUpper.join(', '));