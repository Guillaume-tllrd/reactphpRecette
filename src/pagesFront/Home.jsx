import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Caroussel from '../components/recipes/Caroussel';

const Home = () => {
    return (
        <div>
            <Header />
            <Caroussel/>
            <Footer/>
        </div>
    );
};

export default Home;