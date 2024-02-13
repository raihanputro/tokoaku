import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  register: 'user/register',
  login: 'user/login',
  userList: 'user/list',
  userDetail: 'user/detail',
  userUpdate: 'user/update',
  profile: 'user/profile',
  deleteUser: 'user/remove',
  itemList: 'item/list',
  itemDetail: 'item/detail',
  addItem: 'item/add',
  updateItem: 'item/update',
  deleteItem: 'item/remove',
  addCart: 'cart/add',
  getCartByUser: 'cart/user',
  updateCart: 'cart/update',
  deleteCart: 'cart/remove'
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

export const updateUserApi = (id, userData) => callAPI(`${urls.userUpdate}/${id}`, 'PUT', {}, {}, userData);

export const deleteUserApi = (id) => callAPI(`${urls.deleteUser}/${id}`, 'DELETE');
export const itemListApi = () => callAPI(urls.itemList, 'GET');
export const getItemDetailApi = (id) => callAPI(`${urls.itemDetail}/${id}`, 'GET');
export const addItemApi = (itemData) => callAPI(urls.addItem, 'POST', {'Content-Type': 'multipart/form-data; charset=UTF-8'}, {}, itemData);
export const updateItemApi = (id, itemData) => callAPI(`${urls.updateItem}/${id}`, 'PUT', {'Content-Type': 'multipart/form-data; charset=UTF-8'}, {}, itemData);
export const deleteItemApi = (id) => callAPI(`${urls.deleteItem}/${id}`, 'DELETE');
export const addCartApi = (cartData) => callAPI(urls.addCart, 'POST', {}, {}, cartData);
export const getCartApi = (id) => callAPI(`${urls.getCartByUser}/${id}`, 'GET');
export const updateCartApi = (id, dataCart) => callAPI(`${urls.updateCart}/${id}`, 'PUT', {}, {}, dataCart);
export const deleteCartApi = (id) => callAPI(`${urls.deleteCart}/${id}`, 'DELETE');
