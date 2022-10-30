'use strict'

let money,
    isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    start = function () {
        do {
            money = prompt('Ваш месячный доход?', 50000);
        }
        while (!isNumber(money) || money === '' || money === null)
    };
start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    income: {},
    addIncome: [],
    deposit: false,
    mission: 1000000,
    period: 3,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, такси, коммуналка');
        appData.addExpenses = addExpenses.toLowerCase().split(', ')
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {

            let itemExpenses = prompt('Введите обязательную статью расходов?', 'Садик государственный'),
                cashExpenses;
            do {
                cashExpenses = prompt('Во сколько это обойдется?', 2500);
            }
            while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);

            appData.expenses[itemExpenses] = cashExpenses;
        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () {                              //сколько имеем по факту в мес (зп - все обязательные расходы)
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {                         //за сколько мес достигнем миссии (миссия / сколько имеем по факту в мес)
        return appData.mission / appData.budgetMonth;
    },
    getStatusIncome: function () {                        //показывает уровень дохода
        if (appData.budgetDay > 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay < 600) {
            return 'К сожалению, у вас уровень дохода ниже среднего';
        } else if (appData.budgetDay > -Infinity) {
            return 'Что-то пошло не так';
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Уровень дохода: ', appData.getStatusIncome());

if (appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута за : ' + Math.ceil(appData.getTargetMonth()) + 'месяца');
}
else {
    console.log('Цель не будет достигнута');
}

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}