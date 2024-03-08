import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx'
import React, { Suspense, useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext.js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import toast, { Toaster } from 'react-hot-toast';
import WishListContextProvider, { WishListContext } from './Context/WishListContext.js';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js';
const Home = React.lazy(() => import('./Components/Home/Home.jsx'))
const Login = React.lazy(() => import('./Components/Login/Login.jsx'))
const Register = React.lazy(() => import('./Components/Register/Register.jsx'))
const ForgetPassword = React.lazy(() => import('./Components/ForgetPassword/ForgetPassword.jsx'))
const Brands = React.lazy(() => import('./Components/Brands/Brands.jsx'))
const Categories = React.lazy(() => import('./Components/Categories/Categories.jsx'))
const Cart = React.lazy(() => import('./Components/Cart/Cart.jsx'))
const ProductDetails = React.lazy(() => import('./Components/ProductDetails/ProductDetails.jsx'))
const Products = React.lazy(() => import('./Components/Products/Products.jsx'))
const AllOrders = React.lazy(() => import('./Components/AllOrders/AllOrders.jsx'))
const WishList = React.lazy(() => import('./Components/WishList/WishList.jsx'))
const Profile = React.lazy(() => import('./Components/Profile/Profile.jsx'))
const NotFound = React.lazy(() => import('./Components/NotFound/NotFound.jsx'))
const ResetPassword = React.lazy(() => import('./Components/ResetPassword/ResetPassword.jsx'))
const VerifyCode = React.lazy(() => import('./Components/VerifyCode/VerifyCode.jsx'))
const ShippingAddress = React.lazy(() => import('./Components/ShippingAddress/ShippingAddress.jsx'))
export default function App() {
  let routes = createHashRouter([
    {
      path: '/', element: <Layout />, children: [
        { index: true, element: <Suspense fallback={<div> </div>}> <ProtectedRoute><Home /></ProtectedRoute></Suspense> },
        { path: 'Products', element: <Suspense fallback={<div> </div>}> <ProtectedRoute><Products /></ProtectedRoute></Suspense> },
        { path: 'productDetails/:id', element: <Suspense fallback={<div> </div>}> <ProtectedRoute><ProductDetails /></ProtectedRoute></Suspense> },
        { path: 'Cart', element: <Suspense fallback={<div> </div>}> <ProtectedRoute><Cart /></ProtectedRoute></Suspense> },
        { path: 'Categories', element: <Suspense fallback={<div> </div>}> <ProtectedRoute><Categories /></ProtectedRoute></Suspense> },
        { path: 'Brands', element: <Suspense fallback={<div> </div>}> <ProtectedRoute><Brands /></ProtectedRoute></Suspense> },
        { path: 'WishList', element: <Suspense fallback={<div> </div>}> <ProtectedRoute><WishList /></ProtectedRoute></Suspense> },
        { path: 'AllOrders', element: <Suspense fallback={<div> </div>}> <ProtectedRoute><AllOrders /></ProtectedRoute></Suspense> },
        { path: 'shippingaddress/:id', element: <Suspense fallback={<div> </div>}> <ProtectedRoute><ShippingAddress /></ProtectedRoute></Suspense> },
        { path: 'Profile', element: <Suspense fallback={<div> </div>}> <ProtectedRoute><Profile /></ProtectedRoute></Suspense> },
        { path: 'Login', element: <Suspense fallback={<div> </div>}> <Login /> </Suspense> },
        { path: 'Register', element: < Suspense fallback={< div > </div >} > <Register /> </Suspense > },
        { path: 'ForgetPassword', element: < Suspense fallback={< div > </div >} > <ForgetPassword/> </Suspense > },
        { path: 'ResetPassword', element: < Suspense fallback={< div > </div >} > <ResetPassword/> </Suspense > },
        { path: 'VerifyCode', element: < Suspense fallback={< div > </div >} > <VerifyCode/> </Suspense > },
        { path: '*', element: <Suspense fallback={<div> </div>}> <NotFound /></Suspense> },
      ]
    }
  ])
  let { setUserToken } = useContext(UserContext)
 
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUserToken(localStorage.getItem('userToken'))
    }
    
  }, [])

  return <>
    <WishListContextProvider>
      <Provider store={store}>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </Provider>
    </WishListContextProvider>
  </>
}

