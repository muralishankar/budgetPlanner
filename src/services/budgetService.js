const BUDGET_PLANNER_TABLE = 'budgetplans';

class BudgetPlanService {
    constructor(sqlService) {
        this.sqlService = sqlService;
    }
    async getAllPlans() {
        try {
            let result = await this.sqlService.readTable(BUDGET_PLANNER_TABLE);
            return result.map(({ id, data }) => { return { id, ...data } });
        } catch (e) {
            console.log({ class: "BudgetPlanService", method: "getAllPlans", error: e });
        }
    }
    async addNewPlan(payload) {
        try {
            let result = await this.sqlService.insertItem(BUDGET_PLANNER_TABLE, { ...payload, total: 0, expense: 0, income: 0 });
            return result;
        } catch (e) {
            console.log({ class: "BudgetPlanService", method: "addNewPlan", error: e });
        }
    }
    async updatePlan(id, payload) {

        try {
            let result = await this.sqlService.updateItem(BUDGET_PLANNER_TABLE, JSON.stringify(payload), 'id', id);
            return result;
        } catch (e) {
            console.log({ class: "BudgetPlanService", method: "updatePlan", error: e });
        }
    }
    async deleteItemWithId(id) {
        try {
            let result = await this.sqlService.deleteItemWithId(BUDGET_PLANNER_TABLE, id);
            return result;
        } catch (e) {
            console.log({ class: "BudgetPlanService", method: "deleteItemWithCondition", error: e });
        }
    }
}

module.exports = BudgetPlanService;