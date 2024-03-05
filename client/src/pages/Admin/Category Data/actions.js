import { SET_CATEGORY_DATA, SET_CATEGORY_DETAIL_DATA, GET_CATEGORY_DATA, GET_CATEGORY_DETAIL_DATA, CREATE_CATEGORY_DATA, UPDATE_CATEGORY_DATA, DELETE_CATEGORY_DATA } from "./constants";

export const setCategoryData = (categoryData) => ({
    type: SET_CATEGORY_DATA,
    categoryData,
});

export const setCategoryDetailData = (categoryDetailData) => ({
    type: SET_CATEGORY_DETAIL_DATA,
    categoryDetailData
});

export const getCategoryData = () => ({
    type: GET_CATEGORY_DATA,
});

export const getCategoryDetailData = (id) => ({
    type: GET_CATEGORY_DETAIL_DATA,
    id, 
});

export const createCategoryData = (categoryData) => ({
    type: CREATE_CATEGORY_DATA,
    categoryData,
});

export const updateCategoryData = (id, categoryData) => ({
    type: UPDATE_CATEGORY_DATA,
    id,
    categoryData
});

export const deleteCategoryData = (id) => ({
    type: DELETE_CATEGORY_DATA,
    id
})