import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AdminLayout from './admin/pages/AdminLayout'
import WebsiteLayout from './website/pages/WebsiteLayout'
import Dashboard from './admin/pages/Dashboard'
import AddCategory from './admin/pages/category/AddCategory'
import ViewCategory from './admin/pages/category/ViewCategory'
import ViewColor from './admin/pages/color/ViewColor'
import AddColor from './admin/pages/color/AddColor'
import ViewProduct from './admin/pages/products/ViewProduct'
import AddProduct from './admin/pages/products/AddProduct'
import MainContext from './MainContext'
import EditCategory from './admin/pages/category/EditCategory'
import EditColor from './admin/pages/color/EditColor'
import MultipleImage from './admin/pages/products/MultipleImage'
import EditProduct from './admin/pages/products/EditProduct'
import Login from './admin/pages/Login'
import Home from './website/pages/Home'
import Shop from './website/pages/Shop'
import SignUp from './admin/pages/SignUp'
import ProductDetail from './website/pages/ProductDetail'
import UserLogin from './website/pages/UserLogin'
import CheckOut from './website/pages/CheckOut'
import UserRegister from './website/pages/UserRegister'
import OrderPlace from './website/pages/OrderPlace'
import ProfilePage from './website/pages/ProfilePage'


export default function App() {

  const routes = createBrowserRouter(
    [
      {
        path: '/',
        element: <WebsiteLayout />,
        children: [
          {
            path: '',
            element: <Home />
          },
          {
            path: '/shop/:categoryslug?',
            element: <Shop />
          },
          {
            path: '/product/:product_id',
            element: <ProductDetail />
          },
          {
            path:'/checkout',
            element:<CheckOut/>
          },
          {
            path:'/orderplace/:order_id',
            element:<OrderPlace/>
          },
          {
            path:'/profile',
            element:<ProfilePage/>
          }
        ]
      },
      {
        path: '/userlogin',
        element: <UserLogin />
      },
      {
        path: '/userregister',
        element: <UserRegister />
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: '',
            element: <Dashboard />
          },
          {
            path: 'category',
            element: <ViewCategory />
          },
          {
            path: 'category/add',
            element: <AddCategory />
          },
          {
            path: 'category/edit/:category_id',
            element: <EditCategory />
          },
          {
            path: 'color',
            element: <ViewColor />
          },
          {
            path: 'color/add',
            element: <AddColor />
          },
          {
            path: 'color/edit/:color_id',
            element: <EditColor />
          },
          {
            path: 'product',
            element: <ViewProduct />
          },
          {
            path: 'product/add',
            element: <AddProduct />
          },
          {
            path: 'product/images/:product_id',
            element: <MultipleImage />
          },
          {
            path: 'product/edit/:product_id',
            element: <EditProduct />
          },
        ]
      },
      {
        path: '/admin/login',
        element: <Login />
      },
      {
        path: '/admin/signup',
        element: <SignUp />
      }
    ]
  )
  return (
    <MainContext>
      <RouterProvider router={routes} />
    </MainContext>
  )
}
