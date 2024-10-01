import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import Card from '../components/recipes/Card';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {
    const searchRecipe = useSelector((state) => state.recipeReducer.searchRecipe);
    const countryRecipe = useSelector((state) => state.recipeReducer.countryRecipe);
    // console.log(searchRecipe);
    const location = useLocation();

     // Récupération du terme de recherche depuis l'URL
     const queryParams = new URLSearchParams(location.search);
    //  console.log(location.search); //on a query=${searchRecipe}
     const searchTerm = queryParams.get('query'); // 'query' est ce que j'ai passé dans navigate(`/SearchResult?query=${searchRecipe}`)//  console.log(searchTerm); // on a ${searchRecipe}
    // sinon  on aurait pu  faire passer le term via le store redux en même temps par le formulaire
     
    return (
        <div>
            <Header />
            <div className='bg-amber-100 py-5 pb-5 min-h-96'>
                {searchRecipe && searchRecipe.length > 0 ? (
                    <div className='xl:w-[1350px] mx-auto '>
                        <h1 className='font-scope text-2xl text-center mb-6'>Search result for "{searchTerm}" :</h1>
                        <ul className='flex flex-wrap gap-10 xl:gap-0'>
                            {searchRecipe.map((recipe) => (
                                <Card recipe={recipe} key={recipe.id} />
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className='text-center'>No recipes found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchResult;