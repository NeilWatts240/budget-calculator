'use strict'

let money = 5000;
let income = 'freelance';
let addExpenses = 'интернет, такси, коммуналка';
let deposit = true;
let mission = 1000000;
let period = 6;
let budgetDay = money / 30;


// lesson01
// alert('ku');

// lesson02
// console.log(typeof money);
// console.log(typeof income);
// console.log(typeof deposit)
// console.log(addExpenses.length);
// console.log('Период равен ' + period + ' месяцев');
// console.log('Цель заработать ' + mission + ' рублей');
addExpenses.toLowerCase();
// console.log(addExpenses.split(', '));
// console.log(budgetDay);

// lesson3
money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;
budgetDay = budgetMonth / 30;
console.log(Math.floor(budgetDay));
// console.log(mission / (Math.ceil(budgetMonth)));

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
}
if (budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
}
if (budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
}
