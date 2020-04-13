import * as actions from '../actions/ledger';
import * as budgetPlans from './budgetPlans';
import * as service from '../../services/ledgerService';

export function getTransactions(budget_id) {
    return (dispatch) => {
        dispatch(actions.getTransactions());
        service.getTransactions(budget_id).then((list) => {
            if (list&&list.map) {
                dispatch(actions.getTransactionsSuccess(list));
            } else {
                throw 'Failed';
            }
        }).catch((error) => {
            console.log(error);
            dispatch(actions.getTransactionsFailed());
        });
    }
}
export function addTransaction(item) {
    return (dispatch) => {
        dispatch(actions.addTransaction());
        service.addNewTransaction(item).then((response) => {
            if (response == "Inserted") {
                dispatch(actions.addTransactionSuccess());
                budgetPlans.getBudgetPlans()(dispatch);
                getTransactions(item.budget_id)(dispatch);
            } else {
                throw "Failed";
            }
        }).catch((error) => {
            console.log(error);
            dispatch(actions.addTransactionFailed());
        });
    }
}
export function updateTransaction(item) {
    return (dispatch) => {
        dispatch(actions.updateTransaction());
        service.updatedTransaction(item).then((response) => {
            if (response == "Updated") {
                dispatch(actions.updateTransactionSuccess());
                budgetPlans.getBudgetPlans()(dispatch);
                getTransactions(item.budget_id)(dispatch);
            } else {
                throw "Failed";
            }
        }).catch((error) => {
            console.log(error);
            dispatch(actions.updateTransactionFailed());
        });
    }
}
export function removeTransaction(item) {
    return (dispatch) => {
        dispatch(actions.removeTransaction());
        service.removeTransaction(item).then((response) => {
            if (response == "Deleted") {
                dispatch(actions.removeTransactionSuccess());
                budgetPlans.getBudgetPlans()(dispatch);
                getTransactions(item.budget_id)(dispatch);
            } else {
                throw "Failed";
            }
        }).catch((error) => {
            console.log(error);
            dispatch(actions.removeTransactionFailed());
        });
    }
}
export default {
    getTransactions,
    addTransaction,
    updateTransaction,
    removeTransaction
}