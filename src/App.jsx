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
import CreateRecipe from './pagesBack/CreateRecipe';
import Dashboard from './pagesBack/Dashboard';
import CreateArticle from './pagesBack/CreateArticle';
import RecipeByCategory from './pagesFront/RecipeByCategory';
import RecipePage from './pagesFront/RecipePage';
import ArticlePage from './pagesFront/ArticlePage';

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
        <Route path="/recipes/:category" element={<RecipeByCategory />} />
        <Route path="/recipes/:category/:id" element={<RecipePage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createRecipe" element={<CreateRecipe />} />
        <Route path="/createArticle" element={<CreateArticle />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
