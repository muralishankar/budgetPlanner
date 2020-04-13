import { combineReducers } from 'redux';
import budgetPlans from './budgetPlans';

import ledger from './ledger';

export default combineReducers({
    budgetPlans,
    ledger
});