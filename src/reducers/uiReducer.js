import { types } from "../types/types";
import moment from 'moment'; 

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = moment().minutes(0).seconds(0).add(2, 'hours');
const initialState = {
    modalOpen: false,
    start: now.toDate(),
    end: nowPlus1.toDate(),
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type){
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen:true
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen:false
            }
        case types.uiSetDates:
            return {
                ...state,
                start:action.payload.start,
                end:action.payload.end
            }

        default:
            return state;
    }
}