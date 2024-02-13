import { SET_ITEM_LIST, GET_ITEM_LIST } from "./constants";

export const setItemList = (items) => ({
    type: SET_ITEM_LIST,
    items
})

export const getItemList = () => ({
    type: GET_ITEM_LIST,
})