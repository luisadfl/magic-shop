import React, { useEffect } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { LoginPage, SignupPage, ActivationPage, HomePage, ProductsPage,FAQPage, ProductDetailsPage, ProfilePage, ShopCreatePage, SellerActivationPage, ShopLoginPage, UserInbox } from "./routes/Routes.js";
import {ShopDashboardPage, ShopCreateProduct, ShopAllProducts, ShopPreviewPage, ShopSettingsPage, ShopInboxPage} from "./routes/ShopRoutes.js" 
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadUser, loadSeller } from "./redux/actions/user";
import { useSelector } from 'react-redux';
import ProtectedRoute from './routes/ProtectedRoute.js';
import {ShopHomePage} from "./ShopRoutes";
import SellerProtectedRoute from './routes/SellerProtectedRoute.js';
import { getAllProducts } from "./redux/actions/product";

const App = () => {
  
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignupPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/faq" element={<FAQPage/>}/>
        <Route path="/product/:id" element={<ProductDetailsPage/>}/>
        <Route path="/profile" element={<ProtectedRoute> <ProfilePage/> </ProtectedRoute>
        }/>
        <Route path="/inbox" element={<ProtectedRoute> <UserInbox/> </ProtectedRoute>
        }/>
         <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />

        {/* shop Routes*/}
       <Route path='/shop-create' element={<ShopCreatePage />} />  
       <Route path='/shop-login' element={<ShopLoginPage />} /> 
       <Route path='/shop/:id' element={
        <SellerProtectedRoute>
          <ShopHomePage/>
        </SellerProtectedRoute>
       }/> 
       <Route path='/settings' element={
        <SellerProtectedRoute>
          <ShopSettingsPage/>
        </SellerProtectedRoute>
       }/> 
       <Route path='/dashboard' element={
        <SellerProtectedRoute>
          <ShopDashboardPage/>
        </SellerProtectedRoute>
       }/> 
        <Route path='/dashboard-create-product' element={
        <SellerProtectedRoute>
          <ShopCreateProduct/>
        </SellerProtectedRoute>
       }/>
        <Route path='/dashboard-products' element={
        <SellerProtectedRoute>
          <ShopAllProducts/>
        </SellerProtectedRoute>
       }/>  
         <Route path='/dashboard-messages' element={
        <SellerProtectedRoute>
          <ShopInboxPage/>
        </SellerProtectedRoute>
       }/> 


      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;