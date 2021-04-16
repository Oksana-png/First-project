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

const AppData = function() {
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};
AppData.prototype.start = function() {
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
};
AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.budgetMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.month;
  incomePeriodValue.value = this.calcSavedMoney();

  periodRange.addEventListener('input', () => {
    this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
  });
};

AppData.prototype.addExpensesBlock = function () {
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
};

AppData.prototype.getExpenses = function () {
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  }, this);
};
AppData.prototype.addIncomeBlock = function () {
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
};
AppData.prototype.getIncome = function () {
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = cashIncome;
    }
  }, this);
  for(let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function () {
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item) {
    item = item.trim();
    if(item !== '') {
      this.addExpenses.push(item);
    }
  }, this);
}; 
AppData.prototype.getAddIncome = function () {
  additionalIncomeItem.forEach(function(item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  }, this);
};
  // Сумма всех обязательных расходов
AppData.prototype.getExpensesMonth = function() {
  for(let i in this.expenses) {
    this.expensesMonth += +this.expenses[i];
  }
};
  // Накопления за месяц (доходы - расходы)
AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor((this.budgetMonth / 30));
};
  // Расчет месяцев для достиженя заданной цели
AppData.prototype.getTargetMonth = function() {
  if (targetAmount.value === '') {
    return '';
  }
  this.month = Math.ceil(+(targetAmount.value) / this.budgetMonth);
  if (this.month < 0) {
    return 'Цель не будет достигнута';
  } else {
    return 'Цель будет достигнута за ' + this.month + ' месяцев(-а)';
  }
};
AppData.prototype.getStatusIncome = function() {
  switch (true) {
    case this.budgetDay >= 1200:
      return ('У вас высокий уровень дохода');
    case this.budgetDay >= 600 && this.budgetDay < 1200:
      return ('У вас средний уровень дохода');
    case this.budgetDay < 600 && this.budgetDay >= 0:
      return ('К сожалению у вас уровень дохода ниже среднего');
    case this.budgetDay < 0:
      return ('Что то пошло не так');
  }
};
AppData.prototype.getInfoDeposit = function() {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?');
    } while(!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt('Какая сумма заложена?');
    } while(!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcSavedMoney = function() {
  return this.budgetMonth * periodRange.value;
};
AppData.prototype.getRangeText = function () {
  periodNumber.textContent = periodRange.value;
};
AppData.prototype.reset = function () {
  inputTextDisabled.forEach(function (item) {
    item.disabled = false;
    item.value = '';
  });
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.month = 0;
  
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getBudget();
  this.getAddExpenses();
  this.getAddIncome();
  this.getTargetMonth();
  this.showResult();
  periodRange.value = 1;
  periodNumber.textContent = 1;
  start.style.display = 'block';
  cancel.style.display = 'none';
  start.disabled = 'true';
  // убираем поля дополнительные
  incomeItems = document.querySelectorAll('.income-items');
  if(incomeItems.length === 2) {
    incomeItems[1].remove();
  } else if (incomeItems.length === 3) {
    incomeItems[1].remove();
    incomeItems[2].remove();
  }
  buttonPlusIncome.style.display = 'block';
  expensesItems = document.querySelectorAll('.expenses-items');
  if(expensesItems.length === 2) {
    expensesItems[1].remove();
  } else if (expensesItems.length === 3) {
    expensesItems[1].remove();
    expensesItems[2].remove();
  }
  buttonPlusExpenses.style.display = 'block';
};
AppData.prototype.eventListen = function() {

  start.disabled = 'true';
  // проверка на наличие данных в Месячном доходе
  salaryAmount.addEventListener('input', function () {
    start.disabled = salaryAmount.value.trim() === '';
    // возвращаем true/false и сразу записываем в атрибут
  });
  
  start.addEventListener('click', this.start.bind(this));
  buttonPlusExpenses.addEventListener('click', this.addExpensesBlock);
  buttonPlusIncome.addEventListener('click', this.addIncomeBlock);
  periodRange.addEventListener('input', this.getRangeText);
  cancel.addEventListener('click', this.reset.bind(this));
  // регулярные выражения
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
};

const appData = new AppData();

appData.eventListen();

// // console.log('Наша программа включает в себя данные: ');
// // for(let key in appData) {
// //   console.log(key + ' - ' + appData[key]);
// // }

// // Вывод массива через запятую с пробелом и каждая буква элемента с большой буквы
// let addExpensesUpper = [];
// appData.addExpenses.forEach(function(item) {
//   let character = item[0].toUpperCase();
//   let word = item.slice(1);
//   addExpensesUpper.push(character + word);
// });

// console.log(addExpensesUpper.join(', '));