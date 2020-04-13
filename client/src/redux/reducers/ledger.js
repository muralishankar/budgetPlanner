import actionType from '../types/ledger';
const initialState = {
    transactions: [],
    loading: false,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_TRANSACTIONS:
            return { ...state, loading: true };
        case actionType.GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: action.payload.response
            };
        case actionType.GET_TRANSACTIONS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case actionType.ADD_TRANSACTION:
            return { ...state, loading: true };
        case actionType.ADD_TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case actionType.ADD_TRANSACTION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case actionType.UPDATE_TRANSACTION:
            return { ...state, loading: true };
        case actionType.UPDATE_TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case actionType.UPDATE_TRANSACTION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case actionType.REMOVE_TRANSACTION:
            return { ...state, loading: true };
        case actionType.REMOVE_TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case actionType.REMOVE_TRANSACTION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
export default reducer;