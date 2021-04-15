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


const start = document.getElementById('start');
const buttonPlusIncome = document.querySelectorAll('button')[0];
const buttonPlusExpenses = document.querySelectorAll('button')[1];
const depositCheckbox = document.querySelector('.deposit-checkmark');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetDayValue = document.querySelector('.budget_day-value');
const budgetMonthValue = document.querySelector('.budget_month-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const targetAmount = document.querySelector('.target-amount');
const periodRange = document.querySelector('.period-select');
const periodNumber = document.querySelector('.period-amount');
const salaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
const placeHoldName = document.querySelectorAll('[placeholder="Наименование"]');
const placeHoldNumber = document.querySelectorAll('[placeholder="Сумма"]');


const numderRegect = /[-\.;":'a-zA-Zа-яА-Я\s]/;
const wordRegect = /['A-z'\d]/;
let appData = {
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  month: 0,
  start: function() {
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getTargetMonth();
    appData.showResult();
  },

  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.budgetMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.month;
    incomePeriodValue.value = appData.calcSavedMoney();

    periodRange.addEventListener('input', function () {
      appData.getTargetMonth();
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },

  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    let clearClone = cloneExpensesItem.children;
    for (let key = 0; clearClone.length > key; key++) {
      clearClone[key].value = '';
    }

    buttonPlusExpenses.before(cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      buttonPlusExpenses.style.display = 'none';
    }
  },

  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
      
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeBlock = incomeItems[0].cloneNode(true);
    // очистка полей 
    let clearClone = cloneIncomeBlock.children;
    for (let key = 0; clearClone.length > key; key++) {
      clearClone[key].value = '';
    }
    
    buttonPlusIncome.before(cloneIncomeBlock);
    incomeItems = document.querySelectorAll('.income-items');
    
    if (incomeItems.length === 3) {
      buttonPlusIncome.style.display = 'none';
    }
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for(let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },  
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if(item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },  
  getAddIncome: function () {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  // Сумма всех обязательных расходов
  getExpensesMonth: function() {
    for(let i in appData.expenses) {
      appData.expensesMonth += +appData.expenses[i];
    }
  },
  // Накопления за месяц (доходы - расходы)
  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor((appData.budgetMonth / 30));
  },
  // Расчет месяцев для достиженя заданной цели
  getTargetMonth: function() {
    appData.month = Math.ceil(+(targetAmount.value) / appData.budgetMonth);
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
    return appData.budgetMonth * periodRange.value;
  },
  getRangeText: function () {
    periodNumber.textContent = periodRange.value;
  },
};

start.disabled = 'true';
// проверка на наличие данных в Месячном доходе
salaryAmount.addEventListener('input', function () {
  start.disabled = salaryAmount.value.trim() === '';
  // возвращаем true/false и сразу записываем в атрибут
});

start.addEventListener('click', appData.start);
buttonPlusExpenses.addEventListener('click', appData.addExpensesBlock);
buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);
periodRange.addEventListener('input', appData.getRangeText);

placeHoldName.forEach(function(item) {
  item.addEventListener('input', function() {
    item.value = item.value.replace(wordRegect, '');
  });
});

placeHoldNumber.forEach(function(item) {
  item.addEventListener('input', function() {
    item.value = item.value.replace(numderRegect, '');
  });
});


// console.log('Наша программа включает в себя данные: ');
// for(let key in appData) {
//   console.log(key + ' - ' + appData[key]);
// }

// Вывод массива через запятую с пробелом и каждая буква элемента с большой буквы
let addExpensesUpper = [];
appData.addExpenses.forEach(function(item) {
  let character = item[0].toUpperCase();
  let word = item.slice(1);
  addExpensesUpper.push(character + word);
});

console.log(addExpensesUpper.join(', '));