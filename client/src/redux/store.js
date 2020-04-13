import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
    enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(applyMiddleware(thunk),/* applyMiddleware(someReduxMiddleware, someOtherReduxMiddleware),*/ ...enhancerList);

export const initStore = () => createStore(rootReducer, {}, composedEnhancer);

