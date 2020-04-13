import * as actions from '../actions/budgetPlans';
import * as service from '../../services/budgetPlanService';

export function getBudgetPlans() {
    return (dispatch) => {
        dispatch(actions.getBudgetPlans());
        service.getBudgetPlans().then((list) => {
            if (list && list.map) {
                dispatch(actions.getBudgetPlansSuccess(list));
            } else {
                throw 'Failed';
            }
        }).catch((error) => {
            console.log(error);
            dispatch(actions.getBudgetPlansFailed());
        });
    }
}
export function addBudgetPlan(item) {
    return (dispatch) => {
        dispatch(actions.addBudgetPlan());
        service.addBudgetPlan(item).then((response) => {
            if (response == "Inserted") {
                dispatch(actions.addBudgetPlanSuccess());
                getBudgetPlans()(dispatch);
            } else {
                throw "Failed";
            }
        }).catch((error) => {
            console.log(error);
            dispatch(actions.addBudgetPlanFailed());
        });
    }
}
export function updateBudgetPlan(item) {
    return (dispatch) => {
        dispatch(actions.updateBudgetPlan());
        service.updateBudgetPlan(item).then((response) => {
            if (response == "Updated") {
                dispatch(actions.updateBudgetPlanSuccess());
                getBudgetPlans()(dispatch);
            } else {
                throw "Failed";
            }
        }).catch((error) => {
            console.log(error);
            dispatch(actions.updateBudgetPlanFailed());
        });
    }
}
export function removeBudgetPlan(id) {
    return (dispatch) => {
        dispatch(actions.removeBudgetPlan());
        service.removeBudgetPlan(id).then((response) => {
            if (response == "Deleted") {
                dispatch(actions.removeBudgetPlanSuccess());
                getBudgetPlans()(dispatch);
            } else {
                throw "Failed";
            }
        }).catch((error) => {
            console.log(error);
            dispatch(actions.removeBudgetPlanFailed());
        });
    }
}