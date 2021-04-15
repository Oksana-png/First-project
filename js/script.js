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
const cancel = document.getElementById('cancel');
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
let inputTextDisabled = document.querySelectorAll('.data [type="text"]');

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
  str: function () {
    appData.start();
  },
  start: function() {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.getTargetMonth();
    this.showResult();

    inputTextDisabled = document.querySelectorAll('.data [type="text"]');
    inputTextDisabled.forEach(function (item) {
      item.disabled = 'true';
    });
    start.style.display = 'none';
    cancel.style.display = 'block';
  },

  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.budgetMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.month;
    incomePeriodValue.value = this.calcSavedMoney();

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
    for(let i in this.expenses) {
      this.expensesMonth += +this.expenses[i];
    }
  },
  // Накопления за месяц (доходы - расходы)
  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor((this.budgetMonth / 30));
  },
  // Расчет месяцев для достиженя заданной цели
  getTargetMonth: function() {
    if (targetAmount.value === '') {
      return '';
    }
    this.month = Math.ceil(+(targetAmount.value) / this.budgetMonth);
    if (appData.month < 0) {
      return 'Цель не будет достигнута';
    } else {
      return 'Цель будет достигнута за ' + this.month + ' месяцев(-а)';
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
  reset: function () {
    inputTextDisabled.forEach(function (item) {
      item.disabled = false;
      item.value = '';
    });
    appData.budget = 0;
    appData.income = {};
    appData.incomeMonth = 0;
    appData.addIncome = [];
    appData.expenses = {};
    appData.addExpenses = [];
    appData.deposit = false;
    appData.percentDeposit = 0;
    appData.moneyDeposit = 0;
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.expensesMonth = 0;
    appData.month = 0;
    
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getTargetMonth();
    appData.showResult();
    start.style.display = 'block';
    cancel.style.display = 'none';
    start.disabled = 'true';
  },
};

start.disabled = 'true';
// проверка на наличие данных в Месячном доходе
salaryAmount.addEventListener('input', function () {
  start.disabled = salaryAmount.value.trim() === '';
  // возвращаем true/false и сразу записываем в атрибут
});

start.addEventListener('click', appData.str);
buttonPlusExpenses.addEventListener('click', appData.addExpensesBlock);
buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);
periodRange.addEventListener('input', appData.getRangeText);
cancel.addEventListener('click', appData.reset);

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