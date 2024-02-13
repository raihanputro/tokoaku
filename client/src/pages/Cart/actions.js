import { SET_DATA_CART, GET_DATA_CART, UPDATE_DATA_CART, DELETE_DATA_CART } from "./constants";

export const setDataCart = (cart) => ({
    type: SET_DATA_CART,
    cart
});

export const getDataCart = (id) => ({
    type: GET_DATA_CART,
    id, 
});

export const updateDataCart = (id, dataCart, userId) => ({
    type: UPDATE_DATA_CART,
    id,
    dataCart,
    userId
});

export const deleteDataCart = (id, userId) => ({
    type: DELETE_DATA_CART,
    id,
    userId
});
