import { SET_ITEM_DATA, GET_ITEM_DATA, UPDATE_ITEM_DATA, DELETE_ITEM_DATA } from "./constants"; 

export const setItemData = (itemData) => ({
    type: SET_ITEM_DATA,
    itemData,
});

export const getItemData = () => ({
    type: GET_ITEM_DATA,
});

export const updateItemData = (id, itemData) => ({
    type: UPDATE_ITEM_DATA,
    id,
    itemData
});

export const deleteItemData = (id) => ({
    type: DELETE_ITEM_DATA,
    id
})