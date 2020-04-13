import budgetPlans from '../types/budgetPlans';

export function getBudgetPlans() {
    return {
        type: budgetPlans.GET_BUDGET_PLANS
    }
}
export function getBudgetPlansSuccess(response) {
    return {
        type: budgetPlans.GET_BUDGET_PLANS_SUCCESS,
        payload: {
            response
        }
    }
}
export function getBudgetPlansFailed() {
    return {
        type: budgetPlans.GET_BUDGET_PLANS_FAILED
    }
}

export function addBudgetPlan() {
    return {
        type: budgetPlans.ADD_BUDGET_PLAN
    }
}
export function addBudgetPlanSuccess() {
    return {
        type: budgetPlans.ADD_BUDGET_PLAN_SUCCESS
    }
}
export function addBudgetPlanFailed() {
    return {
        type: budgetPlans.ADD_BUDGET_PLAN_FAILED
    }
}

export function updateBudgetPlan() {
    return {
        type: budgetPlans.UPDATE_BUDGET_PLAN
    }
}

export function updateBudgetPlanSuccess() {
    return {
        type: budgetPlans.UPDATE_BUDGET_PLAN_SUCCESS
    }
}
export function updateBudgetPlanFailed() {
    return {
        type: budgetPlans.UPDATE_BUDGET_PLAN_FAILED
    }
}

export function removeBudgetPlan() {
    return {
        type: budgetPlans.REMOVE_BUDGET_PLAN
    }
}
export function removeBudgetPlanSuccess() {
    return {
        type: budgetPlans.REMOVE_BUDGET_PLAN_SUCCESS
    }
}
export function removeBudgetPlanFailed() {
    return {
        type: budgetPlans.REMOVE_BUDGET_PLAN_FAILED
    }
}
