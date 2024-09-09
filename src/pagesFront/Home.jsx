import { useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Caroussel from '../components/recipes/Caroussel';
import FourRecipesToIndex from '../components/recipes/FourRecipesToIndex';
import ArticlesToIndex from '../components/articles/ArticlesToIndex';
import { getBestRecipesIndex, getFourRecipesToIndex } from '../Redux/actions/recipe.actions';
import { getArticlesToIndex } from '../Redux/actions/article.actions';
import { useDispatch } from 'react-redux';
import BestRecipesIndex from '../components/recipes/BestRecipesIndex';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFourRecipesToIndex());
        dispatch(getArticlesToIndex())
        dispatch(getBestRecipesIndex())
    },[dispatch])

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