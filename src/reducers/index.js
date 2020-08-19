import {combineReducers} from 'redux';
import cardReducer from './cardReducers';

const rootReducer = combineReducers({
    personalCardsState: cardReducer
})

export default rootReducer