import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Caroussel from '../components/recipes/Caroussel';
import FourRecipesToIndex from '../components/recipes/FourRecipesToIndex';

const Home = () => {
    return (
        <div>
            <Header />
            <Caroussel/>
            <FourRecipesToIndex/>
            <Footer/>
        </div>
    );
};

export default Home;