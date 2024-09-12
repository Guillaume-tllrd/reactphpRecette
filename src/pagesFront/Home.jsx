import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Caroussel from '../components/recipes/Caroussel';
import FourRecipesToIndex from '../components/recipes/FourRecipesToIndex';
import ArticlesToIndex from '../components/articles/ArticlesToIndex';
import BestRecipesIndex from '../components/recipes/BestRecipesIndex';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getArticlesToIndex } from '../Redux/actions/article.actions';
import { getBestRecipesIndex, getFourRecipesToIndex } from '../Redux/actions/recipe.actions';

const Home = () => {
const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getArticlesToIndex())
        dispatch(getFourRecipesToIndex())
        dispatch(getBestRecipesIndex())
    },[dispatch])
// c'est mieux de rejouer sur la page Home tout ce qui se fecth sur cette même page, plus de bug pour les articles
    return (
        <div>
            <Header />
            <Caroussel/>
            <ArticlesToIndex />
            <FourRecipesToIndex/>
            <BestRecipesIndex/>
            <Footer/>
        </div>
    );
};

export default Home;