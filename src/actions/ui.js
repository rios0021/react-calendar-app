import { types } from "../types/types";


export const uiSetDates = (start, end) => ({
    type: types.uiSetDates, 
    payload: {
        start,
        end
    }
})

export const uiOpenModal = () => ({type: types.uiOpenModal})

export const uiCloseModal = () => ({type: types.uiCloseModal})