let money = 15000;
let income = 'маникюрчик';
let addExpenses = 'еда, транспорт, интернет, вкусняшки';
let deposit = true;
let mission = 1000000;
let period = 3;

alert('Первый урок какой-то легкий, подозрительно');
console.log('И сюда напишем что-нибудь');

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log('Длина строки addExpenses: ', addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log((addExpenses.toLowerCase()).split(', '));

let budgetDay = money / 30;
console.log(budgetDay);
