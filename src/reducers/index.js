import {combineReducers} from 'redux';
import cardReducer from './cardReducers';

const rootReducer = combineReducers({
    PCState: cardReducer
})

export default rootReducer