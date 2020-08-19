import {combineReducers} from 'redux';
import cardReducer from './cardReducers';

const rootReducer = combineReducers({
    myCardsState: cardReducer
})

export default rootReducer