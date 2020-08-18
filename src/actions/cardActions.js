export const CARD_ADD = 'CARD_ADD';
export const CARD_REMOVE = 'CARD_REMOVE';

export const cardAdd = (data) =>({
    type: CARD_ADD,
    payload: data
})
export const cardReomve = (data) =({
    type: CARD_REMOVE,
    payload: data
})