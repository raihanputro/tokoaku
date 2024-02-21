import { SET_DATA_CART, GET_DATA_CART, UPDATE_DATA_CART, DELETE_DATA_CART } from "./constants";

export const setDataCart = (cart) => ({
    type: SET_DATA_CART,
    cart
});

export const getDataCart = () => ({
    type: GET_DATA_CART,
});

export const updateDataCart = (id, dataCart) => ({
    type: UPDATE_DATA_CART,
    id,
    dataCart,
});

export const deleteDataCart = (id) => ({
    type: DELETE_DATA_CART,
    id,
});
