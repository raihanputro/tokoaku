import { SET_ITEM_SEACH, GET_ITEM_SEACH } from "./constants";

export const setItemSearch = (itemSearchData) => ({
    type: SET_ITEM_SEACH,
    itemSearchData
});

export const getItemSearch = ( name, category_id ) => ({
    type: GET_ITEM_SEACH,
    name, 
    category_id
});
