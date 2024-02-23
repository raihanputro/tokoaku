import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectWishlistState = (state) => state.wishlist || initialState;

export const selectWishlist = createSelector(selectWishlistState, (state) => state.wishlistData);
