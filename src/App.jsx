import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pagesFront/Home';
import Recipes from './pagesFront/Recipes';
import Articles from './pagesFront/Articles';
import Favoris from './pagesFront/Favoris';
import './input.css';
import Login from './pagesFront/Login';
import Register from './pagesFront/Register';
import { getSessionUser } from './Redux/actions/user.action';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getSessionUser());  // Au moment de recharger la page si un token est présent dans le localStorage on redemande le les données de user car sinon elles disparaissent du store
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
