"use strict";

let isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let isStr = (str) => {
  if (isNaN(+str)) {
    // Когда не число - true
    return false;
  } else {
    return true;
  }
};

const start = document.getElementById("start");
const cancel = document.getElementById("cancel");
const buttonPlusIncome = document.querySelectorAll("button")[0];
const buttonPlusExpenses = document.querySelectorAll("button")[1];
const depositCheckbox = document.getElementById("deposit-check");
const additionalIncomeItem = document.querySelectorAll(
  ".additional_income-item"
);

const budgetDayValue = document.querySelector(".budget_day-value");
const budgetMonthValue = document.querySelector(".budget_month-value");
const expensesMonthValue = document.querySelector(".expenses_month-value");
const additionalIncomeValue = document.querySelector(
  ".additional_income-value"
);
const additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
const additionalExpensesValue = document.querySelector(
  ".additional_expenses-value"
);
const incomePeriodValue = document.querySelector(".income_period-value");
const targetMonthValue = document.querySelector(".target_month-value");
const targetAmount = document.querySelector(".target-amount");
const periodRange = document.querySelector(".period-select");
const periodNumber = document.querySelector(".period-amount");
const salaryAmount = document.querySelector(".salary-amount");
let expensesItems = document.querySelectorAll(".expenses-items");
let incomeItems = document.querySelectorAll(".income-items");
let placeHoldName = document.querySelectorAll('[placeholder="Наименование"]');
let placeHoldNumber = document.querySelectorAll('[placeholder="Сумма"]');
let inputTextDisabled = document.querySelectorAll('.data [type="text"]');
const depositBank = document.querySelector(".deposit-bank");
const depositAmount = document.querySelector(".deposit-amount");
const depositPercent = document.querySelector(".deposit-percent");

const numderRegect = /[-\.;":'a-zA-Zа-яА-Я\s]/;
const wordRegect = /['A-z'\d]/;

class AppData {
  constructor() {
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
  }

  start() {
    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.getTargetMonth();
    this.showResult();

    inputTextDisabled = document.querySelectorAll('.data [type="text"]');
    inputTextDisabled.forEach(function (item) {
      item.disabled = "true";
    });
    start.style.display = "none";
    cancel.style.display = "block";
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.month;
    incomePeriodValue.value = this.calcSavedMoney();

    periodRange.addEventListener("input", () => {
      this.getTargetMonth();
      incomePeriodValue.value = this.calcSavedMoney();
    });
  }

  addBlocks(item) {
    let items = document.querySelectorAll(`.${item}-items`);
    let cloneItem = items[0].cloneNode(true);
    let btn = document.querySelector(`.${item}_add`);
    // очистка полей
    let clearClone = cloneItem.children;
    for (let key = 0; clearClone.length > key; key++) {
      clearClone[key].value = "";
    }
    btn.before(cloneItem);

    items = document.querySelectorAll(`.${item}-items`);
    if (items.length === 3) {
      btn.style.display = "none";
    }

    this.checkInput();
  }

  getExpInc() {
    const count = (item) => {
      const str = item.className.split("-")[0];
      let itemTitle = item.querySelector(`.${str}-title`).value;
      let itemAmount = item.querySelector(`.${str}-amount`).value;
      if (itemTitle !== "" && itemAmount !== "") {
        this[str][itemTitle] = +itemAmount;
      }
    };
    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }

  // Сумма всех обязательных расходов
  getExpensesMonth() {
    for (let i in this.expenses) {
      this.expensesMonth += +this.expenses[i];
    }
  }
  // Накопления за месяц (доходы - расходы)
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  // Расчет месяцев для достиженя заданной цели
  getTargetMonth() {
    if (targetAmount.value === "") {
      return "";
    }
    this.month = Math.ceil(+targetAmount.value / this.budgetMonth);
    if (this.month < 0) {
      return `Цель не будет достигнута`;
    } else {
      return `Цель будет достигнута за ${this.month} месяцев(-а)`;
    }
  }

  getStatusIncome() {
    switch (true) {
      case this.budgetDay >= 1200:
        return "У вас высокий уровень дохода";
      case this.budgetDay >= 600 && this.budgetDay < 1200:
        return "У вас средний уровень дохода";
      case this.budgetDay < 600 && this.budgetDay >= 0:
        return "К сожалению у вас уровень дохода ниже среднего";
      case this.budgetDay < 0:
        return "Что то пошло не так";
    }
  }

  calcSavedMoney() {
    return this.budgetMonth * periodRange.value;
  }
  getRangeText() {
    periodNumber.textContent = periodRange.value;
  }
  getInfoDeposit() {
    if (this.deposit) {
      start.disabled = "false";
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePersent() {
    const valueSelect = this.value;

    if (valueSelect === "other") {
      depositPercent.style.display = "inline-block";
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = "none";
    }
  }

  depositHandler() {
    if (depositCheckbox.checked) {
      depositAmount.style.display = "inline-block";
      depositBank.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePersent);
    } else {
      depositAmount.style.display = "none";
      depositBank.style.display = "none";
      depositPercent.value = "";
      depositAmount.value = "";
      depositBank.value = "";
      this.deposit = false;
      depositBank.removeEventListener("change", this.changePersent);
    }
  }
  reset() {
    inputTextDisabled.forEach((item) => {
      item.disabled = false;
      item.value = "";
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

    this.getExpInc();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.getTargetMonth();
    this.showResult();
    periodRange.value = 1;
    periodNumber.textContent = 1;
    start.style.display = "block";
    cancel.style.display = "none";
    start.disabled = "true";
    // убираем поля дополнительные
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 2) {
      incomeItems[1].remove();
    } else if (incomeItems.length === 3) {
      incomeItems[1].remove();
      incomeItems[2].remove();
    }
    buttonPlusIncome.style.display = "block";
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 2) {
      expensesItems[1].remove();
    } else if (expensesItems.length === 3) {
      expensesItems[1].remove();
      expensesItems[2].remove();
    }
    depositAmount.style.display = "none";
    depositBank.style.display = "none";
    depositPercent.value = "";
    depositAmount.value = "";
    depositBank.value = "";
    this.deposit = false;
    depositCheckbox.checked = false;
    buttonPlusExpenses.style.display = "block";
  }
  checkInput() {
    placeHoldName = document.querySelectorAll('[placeholder="Наименование"]');
    placeHoldNumber = document.querySelectorAll('[placeholder="Сумма"]');
    // регулярные выражения
    placeHoldName.forEach(function (item) {
      item.addEventListener("input", function () {
        item.value = item.value.replace(wordRegect, "");
      });
    });
    placeHoldNumber.forEach(function (item) {
      item.addEventListener("input", function () {
        item.value = item.value.replace(numderRegect, "");
      });
    });
  }
  eventListen() {
    start.disabled = "true";
    // проверка на наличие данных в Месячном доходе
    salaryAmount.addEventListener("input", function () {
      start.disabled = salaryAmount.value.trim() === "";
      // возвращаем true/false и сразу записываем в атрибут
    });
    depositPercent.addEventListener("input", () => {
      if (depositPercent.value < 1 || depositPercent.value > 100) {
        start.disabled = "true";
        alert('Введите корректные данные в поле "Процент"');
      } else {
        start.disabled = false;
      }
    });
    start.addEventListener("click", this.start.bind(this));
    buttonPlusExpenses.addEventListener(
      "click",
      this.addBlocks.bind(this, "expenses")
    );
    buttonPlusIncome.addEventListener(
      "click",
      this.addBlocks.bind(this, "income")
    );
    periodRange.addEventListener("input", this.getRangeText);
    cancel.addEventListener("click", this.reset.bind(this));
    depositCheckbox.addEventListener("change", this.depositHandler.bind(this));
    this.checkInput();
  }
}

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
