'use strict'

document.addEventListener('DOMContentLoaded', () => {

    let start = document.getElementById('start'),
        btnPlus = document.getElementsByTagName('button'),
        incomePlus = btnPlus[0],
        expensesPlus = btnPlus[1],
        depositCheck = document.querySelector('#deposit-check'),
        depositBank = document.querySelector('.deposit-bank'),
        additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
        salaryAmount = document.querySelector('.salary-amount'),
        incomeTitle = document.querySelector('.income-title'),
        expensesTitle = document.querySelector('.expenses-title'),
        expensesItems = document.querySelectorAll('.expenses-items'),
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        depositAmount = document.querySelector('.deposit-amount'),
        depositPercent = document.querySelector('.deposit-percent'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount'),
        budgetDayValue = document.querySelector('.budget_day-value'),
        budgetMonthValue = document.querySelector('.budget_month-value'),
        expensesMonthValue = document.querySelector('.expenses_month-value'),
        additionalIncomeValue = document.querySelector('.additional_income-value'),
        additionalExpensesValue = document.querySelector('.additional_expenses-value'),
        incomePeriodValue = document.querySelector('.income_period-value'),
        targetMonthValue = document.querySelector('.target_month-value'),
        incomeItems = document.querySelectorAll('.income-items'),
        cancelBtn = document.querySelector('#cancel');

    class AppData {
        constructor() {
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.income = {};
            this.incomeMonth = 0;
            this.addIncome = [];
            this.expenses = {};
            this.expensesMonth = 0;
            this.addExpenses = [];
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
        }
        start() {
            this.budget = +salaryAmount.value;
            this.getExpInc();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getInfoDeposit();
            this.getBudget();
            this.showResult();
            if (start.disabled == false) {
                this.changeButton();
            }
        }
        showResult() {
            const _this = this;
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = Math.round(this.budgetDay);
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
            periodSelect.addEventListener('input', function () {
                periodAmount.textContent = periodSelect.value;
                incomePeriodValue.value = _this.calcPeriod();
            });
        }
        addExpensesBlock() {
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        }
        addIncomeBlock() {
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if (incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }
        }
        getExpInc() {
            const count = item => {
                const startStr = item.className.split('-')[0];
                const itemTitle = item.querySelector(`.${startStr}-title`).value;
                const itemAmount = item.querySelector(`.${startStr}-amount`).value;
                if (itemTitle !== '' && itemAmount !== '') {
                    this[startStr][itemTitle] = itemAmount;
                }
            }
            incomeItems.forEach(count);
            expensesItems.forEach(count);
            for (const key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        }
        getAddExpenses() {
            let addExpenses = additionalExpensesItem.value.split(',');
            const _this = this;
            addExpenses.forEach(function (item) {
                item = item.trim();
                if (item !== '') {
                    _this.addExpenses.push(item);
                }
            });
        }
        getAddIncome() {
            const _this = this;
            additionalIncomeItem.forEach(function (item) {
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    _this.addIncome.push(itemValue);
                }
            });
        }
        getExpensesMonth() {
            for (let key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        }
        getBudget() {
            const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
            this.budgetDay = this.budgetMonth / 30;
        }
        getTargetMonth() {
            return targetAmount.value / this.budgetMonth;
        }
        calcPeriod() {
            return this.budgetMonth * periodSelect.value;
        }
        stateHandle() {
            if (salaryAmount.value !== '') {
                start.disabled = false;
            }
        }
        changeButton() {
            start.style.display = 'none';
            cancelBtn.style.display = 'block';
        }
        cancel() {
            location.reload();
        }
        getInfoDeposit() {
            if (this.deposit) {
                this.percentDeposit = depositPercent.value;
                this.moneyDeposit = depositAmount.value;
            }
        }
        changePercent() { //дз
            const valueSelect = this.value;
            if (valueSelect === 'other') {
                //дз
            } else {
                depositPercent.value = valueSelect;
            }
        }
        depositHandler() {
            if (depositCheck.checked) {
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                this.deposit = true;
                depositBank.addEventListener('change', this.changePercent);
            } else {
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositBank.value = '';
                depositAmount.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change', this.changePercent);
            }
        }
        eventListeners() {
            start.addEventListener('click', this.start.bind(this));
            salaryAmount.addEventListener('input', this.stateHandle);
            expensesPlus.addEventListener('click', this.addExpensesBlock);
            incomePlus.addEventListener('click', this.addIncomeBlock);
            cancelBtn.addEventListener('click', this.cancel);
            depositCheck.addEventListener('change', this.depositHandler.bind(this));
        }
    }
    const newData = new AppData();
    newData.eventListeners();
});

/* Напишите функцию на JS. Цель: Убрать все объекты с типом additional, а для basic очки уменьшить в двое.

Изменить необходимо исходный массив*/

// const myLesson = [
//     { lesson: 1, type: "basic", points: 2 },
//     { lesson: 2, type: "additional", points: 4 },
//     { lesson: 3, type: "basic", points: 6 },
//     { lesson: 4, type: "additional", points: 3 },
//     { lesson: 5, type: "basic", points: 4 },
//     { lesson: 6, type: "basic", points: 2 },
//     { lesson: 7, type: "additional", points: 2 },
//     { lesson: 8, type: "basic", points: 6 },
//     { lesson: 9, type: "basic", points: 4 },
//     { lesson: 10, type: "basic", points: 6 },
//     { lesson: 11, type: "additional", points: 5 },
//     { lesson: 12, type: "basic", points: 2 },
//     { lesson: 13, type: "additional", points: 2 },
//     { lesson: 14, type: "basic", points: 4 },
//     { lesson: 15, type: "additional", points: 1 },
//     { lesson: 16, type: "additional", points: 7 }
// ];

// function calc() {
//     myLesson.forEach(function (item, index) {
//         if (item.type === 'additional') {
//             delete myLesson[index];
//         }
//         if (item.type === 'basic') {
//             item.points = item.points / 2;
//         }
//     });
// }
// calc();

/* Напишите функцию на JS. Цель: Убрать все объекты с типом additional, а для basic очки уменьшить в двое.

Cоздать новый массив, оставляя исходные данные неизменными */

// let result = myLesson.filter(function (item) {
//     if (item.type !== 'additional') {
//         item.points = item.points / 2;
//         return item
//     }
// })