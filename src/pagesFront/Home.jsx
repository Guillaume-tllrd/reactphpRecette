import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Caroussel from '../components/recipes/Caroussel';
import FourRecipesToIndex from '../components/recipes/FourRecipesToIndex';
import ArticlesToIndex from '../components/articles/ArticlesToIndex';
import BestRecipesIndex from '../components/recipes/BestRecipesIndex';

const Home = () => {
    

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