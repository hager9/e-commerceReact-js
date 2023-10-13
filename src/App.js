import logo from './logo.svg';
import './App.css';
import { createBrowserRouter , createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from "./Copmonents/Layout/Layout"
import Home from "./Copmonents/Home/Home"
import Cart from "./Copmonents/Cart/Cart"
import Categories from "./Copmonents/Categories/Categories"
import Login from "./Copmonents/Login/Login"
import Register from "./Copmonents/Register/Register"
import Products from "./Copmonents/Products/Products"
import NotFound from "./Copmonents/NotFound/NotFound"
import Brands from "./Copmonents/Brands/Brands"
import UserContextProvider from './Contexts/UserContext';
import ProtectedRoute from './Copmonents/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Copmonents/ProductDetails/ProductDetails';
import CartContextProvider from './Contexts/CartContext';
import { Toaster } from 'react-hot-toast';
import OnlinePayment from './Copmonents/OnlinePayment/OnlinePayment';
import ForgetPassword from './Copmonents/ForgetPassword/ForgetPassword';
import VerifyCode from './Copmonents/VerifyCode/VerifyCode';
import ResetPassword from './Copmonents/ResetPassword/ResetPassword';
import AllOrders from './Copmonents/AllOrders/AllOrders';
import SubCategories from './Copmonents/SubCategories/SubCategories';
import CashPayment from './Copmonents/CashPayment/CashPayment'
import WishListContextProvider from './Contexts/WishListContext';
import WishList from './Copmonents/WishList/WishList';
import Profile from './Copmonents/Profile/Profile';

let router = createHashRouter([
  {
    path: "/", element: <Layout />, children: [
    {index:true , element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path: "cart" , element: <ProtectedRoute><Cart/></ProtectedRoute>},
    {path: "brands" , element: <ProtectedRoute><Brands/></ProtectedRoute>},
    {path: "categories" , element: <ProtectedRoute><Categories/></ProtectedRoute>},
    {path: "categories/:id" , element: <ProtectedRoute><SubCategories/></ProtectedRoute>},
    {path: "wishlist" , element: <ProtectedRoute><WishList/></ProtectedRoute>},
    {path: "login" , element: <Login/>},
    {path: "register" , element: <Register/>},
    {path: "forget-password" , element: <ForgetPassword/>},
    {path: "verify-code" , element: <VerifyCode/>},
    {path: "reset-password" , element: <ResetPassword/>},
    {path: "products" , element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path: "productdetails/:id" , element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path: "cash-payment" , element: <ProtectedRoute><CashPayment/></ProtectedRoute>},
    {path: "online-payment" , element: <ProtectedRoute><OnlinePayment/></ProtectedRoute>},
    {path: "allorders" , element: <ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path: "profile" , element: <ProtectedRoute><Profile/></ProtectedRoute>},
    {path: "*" , element: <NotFound/>}
  ]}
])


let queryClient = new QueryClient();

function App() {
  return <>
    
    <QueryClientProvider client={queryClient}>
      
      <UserContextProvider>
      <CartContextProvider>
      <WishListContextProvider>
    <RouterProvider router={router}>
      
      </RouterProvider>

          </WishListContextProvider>
          </CartContextProvider>
      </UserContextProvider>
    
    <Toaster />
    </QueryClientProvider>
    
  </>
}

export default App;
