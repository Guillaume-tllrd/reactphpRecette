import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import FavoritesRecipes from '../components/recipes/FavoritesRecipes';

const Favoris = () => {
    return (
        <div>
            <Header />
            <FavoritesRecipes />
            <Footer/>
        </div>
    );
};

export default Favoris;