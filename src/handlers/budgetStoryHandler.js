const BudgetService = require('../services/budgetService');
const LedgerService = require('../services/ledgerService');
class BudgetPlanHander {
    constructor(sqlService) {
        this.budgetService = new BudgetService(sqlService);
        this.ledgerService = new LedgerService(sqlService);
    }
    async getAllPlans() {
        let result = await this.budgetService.getAllPlans();
        return result;
    }
    async addNewPlan(payload) {
        let result = await this.budgetService.addNewPlan(payload);
        return result;
    }
    async updatePlan(id,payload) {//
        let result = await this.budgetService.updatePlan(id,payload);
        return result;
    }
    async deletePlan(id) {//
        let result = await this.budgetService.deleteItemWithId(id);
        let out=await this.ledgerService.deleteTransactionByPlanId(id);
        return result;
    } //deleteItemWithConditionPlan
}

module.exports = BudgetPlanHander;