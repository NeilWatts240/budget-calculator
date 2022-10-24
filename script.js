'use strict'

let money = 5000;
let income = 'freelance';
let addExpenses = 'интернет, такси, коммуналка';
let deposit = true;
let mission = 1000000;
let period = 6;
let budgetDay = 50000;

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

// lesson03
money = prompt('Ваш месячный доход?', 50000);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, такси, коммуналка');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?', 'квартира');
let expenses2 = prompt('Введите обязательную статью расходов?', 'машина');
let amount1 = prompt('Во сколько это обойдется?', 1000);
let amount2 = prompt('Во сколько это обойдется?', 1000);

// console.log(Math.floor(budgetDay));
// console.log(mission / (Math.ceil(budgetMonth)));

// lesson04

function getExpensesMonth() {       //все обязательные расходы в месс (расход + расход)
    let num = +amount1 + +amount2;
    return num;
}
function getAccumulatedMonth() {            //сколько имеем по факту в мес (зп - все обязательные расходы)
    let num = money - getExpensesMonth();
    return num;
}
let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {                   //за сколько мес достигнем миссии (миссия / сколько имеем по факту в мес)
    let num = mission / accumulatedMonth;
    return num;
}

budgetDay = getAccumulatedMonth() / 30;         //сколько имеем по факту в день

let ShowTypeOf = function (data) {
    console.log(data, typeof (data));
}
ShowTypeOf(money);
ShowTypeOf(income);
ShowTypeOf(deposit);

let getStatusIncome = function () {
    if (budgetDay > 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budgetDay > 600 && budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay < 600) {
        return 'К сожалению, у вас уровень дохода ниже среднего';
    } else if (budgetDay > -Infinity) {
        return 'Что-то пошло не так';
    }
};

console.log(getStatusIncome());
console.log('Расходы за месяц:', getExpensesMonth());
console.log(addExpenses.split(', '));
console.log('Cрок достижения цели в месяцах:', getTargetMonth());
console.log('Бюджет на день:', budgetDay);