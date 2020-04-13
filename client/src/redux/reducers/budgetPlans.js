import actionType from '../types/budgetPlans';
const initialState = {
    budgetPlans: [],
    loading: false,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_BUDGET_PLANS:
            return { ...state, loading: true };
        case actionType.GET_BUDGET_PLANS_SUCCESS:
            return {
                ...state,
                loading: false,
                budgetPlans: action.payload.response
            };
        case actionType.GET_BUDGET_PLANS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case actionType.ADD_BUDGET_PLAN:
            return { ...state, loading: true };
        case actionType.ADD_BUDGET_PLAN_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case actionType.ADD_BUDGET_PLAN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case actionType.UPDATE_BUDGET_PLAN:
            return { ...state, loading: true };
        case actionType.UPDATE_BUDGET_PLAN_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case actionType.UPDATE_BUDGET_PLAN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case actionType.REMOVE_BUDGET_PLAN:
            return { ...state, loading: true };
        case actionType.REMOVE_BUDGET_PLAN_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case actionType.REMOVE_BUDGET_PLAN_FAILED:
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