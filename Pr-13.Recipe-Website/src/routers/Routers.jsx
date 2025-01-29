import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../firebase.config'; 
import Home from '../components/Home';
import Shop from '../components/Recipes';
import ProductDetails from '../components/RecipeDetails';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ProtectedRoute from './ProtectedRoute';
import Fav from '../components/Fav';
import NotFound from '../components/NotFound';
import RecipeUploadForm from '../components/RecipeUploadForm';

const Routers = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="home" element={<Home />} />
      <Route path="recipes" element={<Shop />} />
      <Route path="recipes/:id" element={<ProductDetails />} />
      <Route path="upload" element={<RecipeUploadForm />} />
      
      <Route path="/*" element={<ProtectedRoute />} />

      <Route path="fav" element={<Fav />} />
      <Route path="login" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="signup" element={user ? <Navigate to="/home" /> : <Signup />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
