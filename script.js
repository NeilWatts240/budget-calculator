'use strict'

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'freelance',
    addExpenses = 'интернет, такси, коммуналка',
    deposit = true,
    mission = 1000000,
    period = 6,
    budgetDay = 50000;

// let start = function () {
//     money = prompt('Ваш месячный доход?', 50000);

//     while (!isNumber(money)) {
//         money = prompt('Ваш месячный доход?', 50000);
//     }
// };

// start();

do {
    money = prompt('Ваш месячный доход?', 50000);

} while (!isNumber(money)) {
    money = prompt('Ваш месячный доход?', 50000);
}

// lesson01
// alert('ku');

// lesson02
// console.log(typeof money);
// console.log(typeof income);
// console.log(typeof deposit)
// console.log(addExpenses.length);
// console.log('Период равен ' + period + ' месяцев');
// console.log('Цель заработать ' + mission + ' рублей');
// console.log(addExpenses.split(', '));
// console.log(budgetDay);

// lesson03

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, такси, коммуналка');
deposit = confirm('Есть ли у вас депозит в банке?');

// let expenses1 = prompt('Введите обязательную статью расходов?', 'квартира');
// let expenses2 = prompt('Введите обязательную статью расходов?', 'машина');
// let amount1 = prompt('Во сколько это обойдется?', 1000);
// let amount2 = prompt('Во сколько это обойдется?', 1000);

let ShowTypeOf = function (data) {
    console.log(data, typeof (data));
}
ShowTypeOf(money);
ShowTypeOf(income);
ShowTypeOf(deposit);

let expenses = [];

let getExpensesMonth = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', 'Садик государственный');
        sum += +prompt('Во сколько это обойдется?', 1000);
    }
    while (!isNumber(sum)) {
        sum = prompt('Во сколько это обойдется?', 1000);
    }
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();

// console.log(Math.floor(budgetDay));  
// console.log(mission / (Math.ceil(budgetMonth)));

// lesson04

// function getExpensesMonth() {       //все обязательные расходы в месс (расход + расход)
//     return +amount1 + +amount2;
// }
function getAccumulatedMonth() {            //сколько имеем по факту в мес (зп - все обязательные расходы)
    return money - expensesAmount;
}
let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {                         //за сколько мес достигнем миссии (миссия / сколько имеем по факту в мес)
    let num = mission / accumulatedMonth;
    if (-Infinity < num) {
        return num + ' - Цель будет достигнута';
    } else {
        return num + ' - Цель не будет достигнута';
    }
}

budgetDay = getAccumulatedMonth() / 30;         //сколько имеем по факту в день

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
console.log('Расходы за месяц:', expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));
console.log('Cрок достижения цели в месяцах:', getTargetMonth());
console.log('Бюджет на день:', budgetDay);

// lesson05
