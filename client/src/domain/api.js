import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  register: 'auth/register',
  login: 'auth/login',
  userList: 'user/list',
  userDetail: 'user/detail',
  userProfileUpdate: 'user/update-profile',
  profile: 'user/profile',
  changePasswordUser: 'user/change-password',
  deleteUser: 'user/remove',
  itemList: 'item/list',
  itemDetail: 'item/detail',
  itemBySearch: 'item/search',
  addItem: 'item/add',
  updateItem: 'item/update',
  deleteItem: 'item/remove',
  categoryList: 'category/list',
  categoryDetail: 'category/detail',
  addCategory: 'category/add',
  updateCategory: 'category/update',
  deleteCategory: 'category/remove',
  addCart: 'cart/add',
  getCartByUser: 'cart/user-list',
  updateCart: 'cart/update',
  deleteCart: 'cart/remove',
  getWishlistByUser: 'wishlist/user',
  addWishlist: 'wishlist/add',
  deleteWishlist: 'wishlist/remove',
  getProvince: 'transaction/province',
  getCity: 'transaction/city',
  getShippingCost: 'transaction/shipping-cost',
  addTransaction: 'transaction/add',
  getAllTransaction: 'transaction/list',
  getTransactionByUser: 'transaction/user',
  getTransactionDetail: 'transaction/detail',
  updateTransactionStatus: 'transaction/notification',
  updateTransactionStatusAdmin: 'transaction/status-admin',
  getReviewByTr: 'review/tr-list',
  addReview: 'review/add',
  updateReview: 'review/update',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');
export const registerUserApi = (userData) => callAPI(urls.register, 'POST', {}, {}, userData); 
export const loginUserApi = (userData) => callAPI(urls.login, 'POST', {}, {}, userData); 
export const userListApi = () => callAPI(urls.userList, 'GET');
export const userDetailApi = (id) => callAPI(`${urls.userDetail}/${id}`, 'GET');
export const profileUserApi = () => callAPI(urls.profile, 'GET');
export const updateProfileUserApi = (profileData) => callAPI(urls.userProfileUpdate, 'PUT', {'Content-Type': 'multipart/form-data; charset=UTF-8'}, {}, profileData);
export const changePasswordUserApi = (changePassData) => callAPI(urls.changePasswordUser, 'PATCH', {}, {}, changePassData);
export const deleteUserApi = (id) => callAPI(`${urls.deleteUser}/${id}`, 'DELETE');
export const itemListApi = () => callAPI(urls.itemList, 'GET');
export const getItemDetailApi = (id) => callAPI(`${urls.itemDetail}/${id}`, 'GET');
export const getItemBySearchApi = (name, category_id) => callAPI(`${urls.itemBySearch}?name=${name}&category_id=${category_id}`, 'GET');
export const addItemApi = (itemData) => callAPI(urls.addItem, 'POST', {'Content-Type': 'multipart/form-data; charset=UTF-8'}, {}, itemData);
export const updateItemApi = (id, itemData) => callAPI(`${urls.updateItem}/${id}`, 'PATCH', {'Content-Type': 'multipart/form-data; charset=UTF-8'}, {}, itemData);
export const deleteItemApi = (id) => callAPI(`${urls.deleteItem}/${id}`, 'DELETE');
export const getAllCategoryApi = () => callAPI(urls.categoryList, 'GET');
export const getCategoryDetailApi = (id) => callAPI(`${urls.categoryDetail}/${id}`, 'GET');
export const addCategoryApi = (categoryData) => callAPI(urls.addCategory, 'POST', {'Content-Type': 'multipart/form-data; charset=UTF-8'}, {}, categoryData);
export const updateCategoryApi = (id, categoryData) => callAPI(`${urls.updateCategory}/${id}`, 'PATCH', {'Content-Type': 'multipart/form-data; charset=UTF-8'}, {}, categoryData);
export const deleteCategoryApi = (id) => callAPI(`${urls.deleteCategory}/${id}`, 'DELETE');
export const addCartApi = (cartData) => callAPI(urls.addCart, 'POST', {}, {}, cartData);
export const getCartApi = () => callAPI(urls.getCartByUser, 'GET');
export const updateCartApi = (id, dataCart) => callAPI(`${urls.updateCart}/${id}`, 'PUT', {}, {}, dataCart);
export const deleteCartApi = (id) => callAPI(`${urls.deleteCart}/${id}`, 'DELETE');
export const getWishlistByUserApi = () => callAPI(urls.getWishlistByUser, 'GET');
export const addWishlistApi = (wishlistData) => callAPI(urls.addWishlist, 'POST', {}, {}, wishlistData);
export const deleteWishlistApi = (id) => callAPI(`${urls.deleteWishlist}/${id}`, 'DELETE');
export const getProvinceApi = () => callAPI(urls.getProvince, 'GET');
export const getCityApi = (provinceId) => callAPI(`${urls.getCity}/${provinceId}`, 'GET');
export const getShippingCostApi = (shippingData) => callAPI(urls.getShippingCost, 'POST', {}, {}, shippingData);
export const addTransactionApi = (transactionData) => callAPI(urls.addTransaction, 'POST', {}, {}, transactionData);
export const getAllTransactionApi = () => callAPI(urls.getAllTransaction, 'GET');
export const getTransactionByUserApi = () => callAPI(urls.getTransactionByUser, 'GET');
export const getTransactionDetailApi = (id) => callAPI(`${urls.getTransactionDetail}/${id}`, 'GET');
export const updateTransactionStatusApi = (transactionData) => callAPI(urls.updateTransactionStatus, 'PUT', {}, {}, transactionData);
export const updateTransactionStatusAdminApi = (id) => callAPI(`${urls.updateTransactionStatusAdmin}/${id}`, 'PATCH', {}, {});
export const getReviewByTrApi = (id) => callAPI(`${urls.getReviewByTr}/${id}`, 'GET');
export const addReviewApi = (reviewData) => callAPI(urls.addReview, 'POST', {}, {}, reviewData);
export const updateReviewApi = (reviewData) => callAPI(urls.updateReview, 'PATCH', {}, {}, reviewData);
