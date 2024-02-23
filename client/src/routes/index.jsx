import MainLayout from '@layouts/MainLayout';
import AdminLayout from '@layouts/AdminLayout';

import Home from '@pages/Home';
import Register from '@pages/Register';
import Login from '@pages/Login';
import Profile from '@pages/Profile';
import Wishlist from '@pages/Wishlist';
import Cart from '@pages/Cart';
import Checkout from '@pages/Checkout';
import DetailItem from '@pages/Detail Item';
import DashboardAdmin from '@pages/Admin/Dashboard Admin';
import UserData from '@pages/Admin/User Data';
import ItemData from '@pages/Admin/Item Data';
import CategoryData from '@pages/Admin/Category Data';
import NotFound from '@pages/NotFound';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout
  },
  {
    path: '/profile',
    name: 'Profile',
    protected: true,
    component: Profile,
    layout: MainLayout
  },
  {
    path: '/item/:id',
    name: 'Item Detail',
    protected: true,
    component: DetailItem,
    layout: MainLayout
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    protected: true,
    component: Wishlist,
    layout: MainLayout
  },
  {
    path: '/cart',
    name: 'Cart',
    protected: true,
    component: Cart,
    layout: MainLayout
  },
  {
    path: '/checkout',
    name: 'Checkout',
    protected: true,
    component: Checkout,
    layout: MainLayout
  },
  {
    path: '/admin',
    name: 'Dashboard Admin',
    protected: true,
    component: DashboardAdmin,
    layout: AdminLayout
  },
  {
    path: '/admin/user-data',
    name: 'User Data Admin',
    protected: true,
    component: UserData,
    layout: AdminLayout
  },
  {
    path: '/admin/item-data',
    name: 'Item Data Admin',
    protected: true,
    component: ItemData,
    layout: AdminLayout
  },
  {
    path: '/admin/category-data',
    name: 'Category Data Admin',
    protected: true,
    component: CategoryData,
    layout: AdminLayout
  },
  { 
    path: '*', 
    name: 'Not Found', 
    protected: false,
    component: NotFound, 
    layout: MainLayout 
  },
];

export default routes;
