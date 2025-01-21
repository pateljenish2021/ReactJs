import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import Shop from '../components/Recipes';
import ProductDetails from '../components/RecipeDetails'
import Login from '../components/Login';
import Signup from '../components/Signup';
import ProtectedRoute from './ProtectedRoute';
import Fav from '../components/Fav';
import NotFound from '../components/NotFound';
import RecipeUploadForm from '../components/RecipeUploadForm';


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="recipes" element={<Shop />} />
      <Route path="recipes/:id" element={<ProductDetails />} />
      <Route path="upload" element={<RecipeUploadForm />} />
      <Route path="/*" element={<ProtectedRoute />}>

      </Route>

      <Route path="fav" element={<Fav />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path='insta/*' element={<Navigate to="https://www.instagram.com/" target="_blank" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;