import loadable from 'shared/utils/loadable';
import { RouteObject } from 'react-router-dom';
import { menu } from './menu';

const ProductList = loadable(() => import('pages/product-list/index'));

import MainLayout from 'shared/layout/main/MainLayout';
import AddCoupon from 'pages/AddCoupon';
import Addblog from 'pages/Addblog';
import Addblogcat from 'pages/Addblogcat';
import Addbrand from 'pages/Addbrand';
import Addcat from 'pages/Addcat';
import Addcolor from 'pages/Addcolor';
import Addproduct from 'pages/Addproduct';
import Blogcatlist from 'pages/Blogcatlist';
import Bloglist from 'pages/Bloglist';
import Brandlist from 'pages/Brandlist';
import Categorylist from 'pages/Categorylist';
import Colorlist from 'pages/Colotlist';
import Couponlist from 'pages/Couponlist';
import Customers from 'pages/Customers';
import Dashboard from 'pages/Dashboard';
import Enquiries from 'pages/Enquiries';
import Forgotpassword from 'pages/Forgotpassword';
import Login from 'pages/Login';
import Orders from 'pages/Orders';
import Resetpassword from 'pages/Resetpassword';
import ViewEnq from 'pages/ViewEnq';
import ViewOrder from 'pages/ViewOrder';

const routes: RouteObject = {
  path: '/',
  children: [
    { path: '', element: <Login /> },
    { path: 'reset-password', element: <Resetpassword /> },
    { path: 'forgot-password', element: <Forgotpassword /> },
    {
      path: 'admin',
      element: <MainLayout menuData={menu} />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'enquiries',
          element: <Enquiries />,
        },
        {
          path: 'enquiries/:id',
          element: <ViewEnq />,
        },
        {
          path: 'blog-list',
          element: <Bloglist />,
        },
        {
          path: 'blog',
          element: <Addblog />,
        },
        {
          path: 'blog/:id',
          element: <Addblog />,
        },
        {
          path: 'coupon-list',
          element: <Couponlist />,
        },
        {
          path: 'coupon',
          element: <AddCoupon />,
        },
        {
          path: 'coupon/:id',
          element: <AddCoupon />,
        },
        {
          path: 'blog-category-list',
          element: <Blogcatlist />,
        },
        {
          path: 'blog-category',
          element: <Addblogcat />,
        },
        {
          path: 'blog-category/:id',
          element: <Addblogcat />,
        },
        {
          path: 'orders',
          element: <Orders />,
        },
        {
          path: 'order/:id',
          element: <ViewOrder />,
        },
        {
          path: 'customers',
          element: <Customers />,
        },
        {
          path: 'list-color',
          element: <Colorlist />,
        },
        {
          path: 'color',
          element: <Addcolor />,
        },
        {
          path: 'color/:id',
          element: <Addcolor />,
        },
        {
          path: 'list-category',
          element: <Categorylist />,
        },
        {
          path: 'category',
          element: <Addcat />,
        },
        {
          path: 'category/:id',
          element: <Addcat />,
        },
        {
          path: 'list-brand',
          element: <Brandlist />,
        },
        {
          path: 'brand',
          element: <Addbrand />,
        },
        {
          path: 'brand/:id',
          element: <Addbrand />,
        },
        {
          path: 'list-product',
          element: <ProductList />,
        },
        {
          path: 'product',
          element: <Addproduct />,
        },
      ],
    },
  ],
};

export default routes;
