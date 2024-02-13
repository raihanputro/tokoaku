import MainLayout from '@layouts/MainLayout';
import AdminLayout from '@layouts/AdminLayout';

import Home from '@pages/Home';
import Register from '@pages/Register';
import Login from '@pages/Login';
import Profile from '@pages/Profile';
import DetailItem from '@pages/Detail Item';
import Cart from '@pages/Cart';
import DashboardAdmin from '@pages/Dashboard Admin';
import DataUser from '@pages/UserData';
import ItemData from '@pages/ItemData';
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
    path: '/cart',
    name: 'Cart',
    protected: true,
    component: Cart,
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
    path: '/admin/data-user',
    name: 'User Data Admin',
    protected: true,
    component: DataUser,
    layout: AdminLayout
  },
  {
    path: '/admin/data-item',
    name: 'Item Data Admin',
    protected: true,
    component: ItemData,
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
