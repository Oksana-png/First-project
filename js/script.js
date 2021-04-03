let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;

alert('Первый урок какой-то легкий, подозрительно');
console.log('И сюда напишем что-нибудь');

money = 15000;
income = 'маникюрчик';
addExpenses = 'еда, транспорт, интернет, вкусняшки';
deposit = true;
mission = 1000000;
period = 3;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log('Длина строки addExpenses: ', addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log((addExpenses.toLowerCase()).split(', '));

let budgetDay = 'Доход за месяц' + ' / ' + money;

console.log(budgetDay);
