import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import timeManagementReducer from '../reducers/timeManagementReducer';
import filterReducer from '../reducers/filterReducer';
import authReducer from '../reducers/authReducer';

export default  () => {
    const store = createStore(
        combineReducers({
            works:timeManagementReducer,
            filter: filterReducer,
            auth: authReducer,
        }),
        applyMiddleware(thunk)
    )
    return store
}
