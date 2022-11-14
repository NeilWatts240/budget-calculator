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

    const AppData = function () {

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expenses = {};
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.mission = 1000000;
    };
    AppData.prototype.start = function () {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        if (start.disabled == false) {
            this.changeButton();
        }
    };
    AppData.prototype.showResult = function () {
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
    };
    AppData.prototype.addExpensesBlock = function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    };
    AppData.prototype.addIncomeBlock = function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    };
    AppData.prototype.getExpenses = function () {
        const _this = this;
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    };
    AppData.prototype.getIncome = function () {
        const _this = this;
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }
            for (let key in _this.income) {
                _this.incomeMonth += +_this.income[key];
            }
        })
    };
    AppData.prototype.getAddExpenses = function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        const _this = this;
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    };
    AppData.prototype.getAddIncome = function () {
        const _this = this;
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    };
    AppData.prototype.getExpensesMonth = function () {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    };
    AppData.prototype.getBudget = function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    };
    AppData.prototype.getTargetMonth = function () {
        return targetAmount.value / this.budgetMonth;
    };
    AppData.prototype.calcPeriod = function () {
        return this.budgetMonth * periodSelect.value;
    };
    AppData.prototype.stateHandle = function () {
        if (salaryAmount.value !== '') {
            start.disabled = false;
        }
    };
    AppData.prototype.changeButton = function () {
        start.style.display = 'none';
        cancelBtn.style.display = 'block';
    };
    AppData.prototype.cancel = function () {
        location.reload();
    };
    AppData.prototype.eventListeners = function () {
        start.addEventListener('click', appData.start.bind(appData));
        salaryAmount.addEventListener('input', appData.stateHandle);
        expensesPlus.addEventListener('click', appData.addExpensesBlock);
        incomePlus.addEventListener('click', appData.addIncomeBlock);
        cancelBtn.addEventListener('click', appData.cancel);
    };

    const appData = new AppData();
    AppData.prototype.eventListeners();
});