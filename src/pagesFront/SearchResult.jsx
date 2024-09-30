import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/header/Header';

const SearchResult = () => {
    const searchRecipe = useSelector((state) => state.recipeReducer.searchRecipe);
    console.log(searchRecipe);
    return (
        <div>
            <Header/>
            <div className='bg-amber-100'>
                      {/* Affichage des résultats */}
                      {searchRecipe && searchRecipe.length > 0 ? (
                    searchRecipe.map(recipe => (
                        <div key={recipe.id}>
                            <h2>{recipe.name}</h2>
                            {/* Ajoute ici le rendu des recettes */}
                        </div>
                    ))
                ) : (
                    <p className='text-center'>No recipes found</p>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default SearchResult;