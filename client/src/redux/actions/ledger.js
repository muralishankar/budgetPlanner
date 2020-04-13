import ledger from '../types/ledger';

export function getTransactions() {
    return {
        type: ledger.GET_TRANSACTIONS
    }
}
export function getTransactionsSuccess(response) {
    return {
        type: ledger.GET_TRANSACTIONS_SUCCESS,
        payload: {
            response
        }
    }
}
export function getTransactionsFailed() {
    return {
        type: ledger.GET_TRANSACTIONS_FAILED
    }
}

export function addTransaction() {
    return {
        type: ledger.ADD_TRANSACTION
    }
}
export function addTransactionSuccess() {
    return {
        type: ledger.ADD_TRANSACTION_SUCCESS
    }
}
export function addTransactionFailed() {
    return {
        type: ledger.ADD_TRANSACTION_FAILED
    }
}

export function updateTransaction(){
    return {
        type: ledger.UPDATE_TRANSACTION
    } 
}

export function updateTransactionSuccess(){
    return {
        type: ledger.UPDATE_TRANSACTION_SUCCESS
    } 
}
export function updateTransactionFailed(){
    return {
        type: ledger.UPDATE_TRANSACTION_FAILED
    } 
}

export function removeTransaction(){
    return {
        type: ledger.REMOVE_TRANSACTION
    }
}
export function removeTransactionSuccess(){
    return {
        type: ledger.REMOVE_TRANSACTION_SUCCESS
    }
}
export function removeTransactionFailed(){
    return {
        type: ledger.REMOVE_TRANSACTION_FAILED
    }
}
