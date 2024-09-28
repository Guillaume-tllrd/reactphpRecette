import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/header/Header';

const SearchResult = () => {
    const searchRecipe = useSelector((state) => state.recipeReducer.searchRecipe);
    return (
        <div>
            <Header/>
            <Footer/>
        </div>
    );
};

export default SearchResult;