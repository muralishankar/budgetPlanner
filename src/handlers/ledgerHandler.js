const LedgerService = require('../services/ledgerService');
const BudgetService = require('../services/budgetService');
class LedgerHander {
    constructor(sqlService) {
        this.ledgerService = new LedgerService(sqlService);
        this.budgetService = new BudgetService(sqlService);
    }
    async getTransactions(budget_id) {
        let result = await this.ledgerService.getTransactions(budget_id);
        return result;
    }
    async getTransaction(id) {
        let result = await this.ledgerService.getTransaction(id);
        if (result&&result.length) {
            return result[0];
        }
        return null;
    }
    async addNewTransaction(payload) {
        let result = await this.ledgerService.addNewTransaction(payload);
        if (result = "Inserted") {
            await this.refreshBudget(payload.budget_id);
        }
        return result;
    }
    async updateTransaction(id, payload) {
        let result = await this.ledgerService.updateTransaction(id, payload);
        if (result = "Updated") {
            await this.refreshBudget(payload.budget_id);
        }
        return result;
    }
    async refreshBudget(budget_id) {
        let list = await this.getTransactions(budget_id);
        let total = 0, expense = 0, income = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].type == 'I') {
                income += parseFloat(list[i].amount);
                total += parseFloat(list[i].amount);
            } else {
                expense += parseFloat(list[i].amount);
                total -= parseFloat(list[i].amount);
            }
        }
        let output = await this.budgetService.updatePlan(budget_id, { expense, total, income });
    }
    async deleteTransaction(id) {
        let data = await this.getTransaction(id);
        let result = await this.ledgerService.deleteTransaction(id);
        if (result == "Deleted" && data) {
            await this.refreshBudget(data.budget_id);
        }
        return result;
    }
}

module.exports = LedgerHander;