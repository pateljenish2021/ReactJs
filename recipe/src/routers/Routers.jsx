import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Aboutus from '../pages/Aboutus';
import ProtectedRoute from './ProtectedRoute';

import Fav from '../pages/Fav';
// import EditRecipePage from '../pages/EditRecipePage';
import NotFound from '../pages/NotFound';
import RecipeUploadForm from '../pages/RecipeUploadForm';


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="recipes" element={<Shop />} />
      <Route path="recipes/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="upload" element={<RecipeUploadForm />} />
      {/* <Route path="/recipes/edit/:id" element={<EditRecipePage />} /> */}
      <Route path="/*" element={<ProtectedRoute />}>


        
      </Route>

      <Route path="fav" element={<Fav />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="aboutus" element={<Aboutus />} />
    

      <Route path='insta/*' element={<Navigate to="https://www.instagram.com/aandm_fashion_retailor/?hl=en" target="_blank" replace />} />

      {/* 404 Page Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
