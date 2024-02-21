import { SET_DETAIL_ITEM, SET_CART_ITEM, GET_DETAIL_ITEM } from "./constants";

export const setItemDetail = (item) => ({
    type: SET_DETAIL_ITEM,
    item
})

export const setCartitem = (cartData) => ({
    type: SET_CART_ITEM,
    cartData,
}) 

export const getItemDetail = (id, cb) => ({
    type: GET_DETAIL_ITEM,
    id, 
    cb
})
