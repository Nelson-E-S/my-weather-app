import * as actions from '../actions/cardActions';

export const initialState ={
    personalCards: []
}

export default function cardReducer(state=initialState,action){
    switch(action.type){
        case actions.CARD_ADD: //payload need array
            return {personalCards: [...state.personalCards,action.payload]};
        case actions.CARD_REMOVE:  //payload needs index
            return {personalCards: [...state.personalCards.slice(0,action.payload),...state.personalCards.slice(action.payload + 1)]};
        default: return state;
    }
}