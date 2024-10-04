import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import Card from '../components/recipes/Card';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getCountryRecipe, getSearchRecipes, getTagRecipe } from '../Redux/actions/recipe.actions';


const SearchResult = () => {
    const dispatch = useDispatch();
    const searchRecipe = useSelector((state) => state.recipeReducer.searchRecipe);
    const countryRecipe = useSelector((state) => state.recipeReducer.countryRecipe);
    const tagRecipe = useSelector((state) => state.recipeReducer.tagRecipe);

    const location = useLocation();
    console.log(countryRecipe);
     // Récupération du terme de recherche depuis l'URL
     const queryParams = new URLSearchParams(location.search);
    //  console.log(location.search); //on a query=${searchRecipe}
     const searchTerm = queryParams.get('query');
     const searchCountry = queryParams.get('country') // 'query' est ce que j'ai passé dans navigate(`/SearchResult?query=${searchRecipe}`)//  console.log(searchTerm); // on a ${searchRecipe}
     const searchTag = queryParams.get('tag') // 'query' est ce que j'ai passé dans navigate(`/SearchResult?query=${searchRecipe}`)//  console.log(searchTerm); // on a ${searchRecipe}
    // sinon  on aurait pu  faire passer le term via le store redux en même temps par le formulaire
     
    useEffect(() => {
        if(searchTerm){
            dispatch(getSearchRecipes(searchTerm))
        } else if(searchCountry){
            dispatch(getCountryRecipe(searchCountry))
        }else if(searchTag){
            dispatch(getTagRecipe(searchTag))
        }    
    },[searchTerm, searchCountry, searchTag])
    // on met dans le useEffect pour pouvoir relancer si jamais quelqu'un tape dans l'URL
    return (
        <div>
        <Header />
        <div className='bg-amber-100 py-5 pb-5'>
            {searchTerm && <h1 className='font-scope text-2xl text-center mb-6'>Search result for "{searchTerm}" :</h1>}
            {searchCountry && <h1 className='font-scope text-2xl text-center mb-6'>Recipes from "{searchCountry}" :</h1>}
            {searchTag && <h1 className='font-scope text-2xl text-center mb-6'>"Explore our recipes with "{searchTag}" :</h1>}

            {(searchRecipe && searchRecipe.length > 0) || (countryRecipe && countryRecipe.length > 0) || (tagRecipe && tagRecipe.length > 0)? (
                <div className='xl:w-[1350px] mx-auto'>
                    <ul className='flex flex-wrap gap-10 xl:gap-0'>
                        {searchTerm && searchRecipe.map((recipe) => (
                            <Card recipe={recipe} key={recipe.id}/>
                        ))}
                        {searchCountry && countryRecipe.map((recipe) => (
                           
                            <Card recipe={recipe} key={recipe.id}/>
                        ))}
                        {searchTag && tagRecipe.map((recipe) => (
                           
                            <Card recipe={recipe} key={recipe.id}/>
                        ))}
                    </ul>  
                </div>
            ) : (
                <p className='text-center'>No recipes found</p>
            )}
        </div>
        <Footer />
    </div>
    );
};

export default SearchResult;