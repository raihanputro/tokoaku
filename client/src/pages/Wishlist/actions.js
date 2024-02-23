import { SET_WISHLIST_DATA, POST_WISHLIST_DATA, GET_WISHLIST_DATA, DELETE_WISHLIST_DATA } from "./constants";

export const setWishlistData = (wishlistData) => ({
    type: SET_WISHLIST_DATA,
    wishlistData
});

export const postWishlistData = (wishlistData) => ({
    type: POST_WISHLIST_DATA,
    wishlistData
});

export const getWishlistData = () => ({
    type: GET_WISHLIST_DATA,
});

export const deleteWishlistData = (id) => ({
    type: DELETE_WISHLIST_DATA,
    id
});