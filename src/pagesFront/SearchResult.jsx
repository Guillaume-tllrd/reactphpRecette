import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import Card from '../components/recipes/Card';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getCountryRecipe, getSearchRecipes, getTagRecipe } from '../Redux/actions/recipe.actions';
import { getTagArticle } from '../Redux/actions/article.actions';
import ArticlePost from '../components/articles/ArticlePost';

const SearchResult = () => {
    const dispatch = useDispatch();
    const searchRecipe = useSelector((state) => state.recipeReducer.searchRecipe);
    const countryRecipe = useSelector((state) => state.recipeReducer.countryRecipe);
    const tagRecipe = useSelector((state) => state.recipeReducer.tagRecipe);
    const tagArticle = useSelector((state) => state.articleReducer.tagArticle);

    const location = useLocation();
    console.log(countryRecipe);
     // Récupération du terme de recherche depuis l'URL
     const queryParams = new URLSearchParams(location.search);
    //  console.log(location.search); //on a query=${searchRecipe}
     const searchTerm = queryParams.get('query');
     const searchCountry = queryParams.get('country') // 'query' est ce que j'ai passé dans navigate(`/SearchResult?query=${searchRecipe}`)//  console.log(searchTerm); // on a ${searchRecipe}
     const searchTagRecipe = queryParams.get('tagRecipe') // 'query' est ce que j'ai passé dans navigate(`/SearchResult?query=${searchRecipe}`)//  console.log(searchTerm); // on a ${searchRecipe}
    // sinon  on aurait pu  faire passer le term via le store redux en même temps par le formulaire
     const searchTagArticle = queryParams.get('tagArticle');
    useEffect(() => {
        if(searchTerm){
            dispatch(getSearchRecipes(searchTerm))
        } else if(searchCountry){
            dispatch(getCountryRecipe(searchCountry))
        }else if(searchTagRecipe){
            dispatch(getTagRecipe(searchTagRecipe))
        }    
        else if(searchTagArticle){
            dispatch(getTagArticle(searchTagArticle))
        }    
    },[searchTerm, searchCountry, searchTagRecipe, searchTagArticle])
    // on met dans le useEffect pour pouvoir relancer si jamais quelqu'un tape dans l'URL
    return (
        <div>
            <Header />
            <div className="bg-amber-100 py-5 pb-5 min-h-[600px]">
                {searchTerm && (
                    <h1 className="font-scope text-2xl text-center mb-6">
                        Search result for "{searchTerm}" :
                    </h1>
                )}
                {searchCountry && (
                    <h1 className="font-scope text-2xl text-center mb-6">
                        Recipes from "{searchCountry}" :
                    </h1>
                )}
                {searchTagRecipe && (
                    <h1 className="font-scope text-2xl text-center mb-6">
                        Explore our recipes with "{searchTagRecipe}" :
                    </h1>
                )}
                {searchTagArticle && (
                    <h1 className="font-scope text-2xl text-center mb-6">
                        Explore our articles with "{searchTagArticle}" :
                    </h1>
                )}
    
                {(searchRecipe?.length > 0 || countryRecipe?.length > 0 ||tagRecipe?.length > 0) ? (
                    <div className="xl:w-[1350px] mx-auto">
                        <ul className="flex flex-wrap gap-10 xl:gap-0">
                            {searchTerm && searchRecipe.map((recipe) => (
                                    <Card recipe={recipe} key={recipe.id} />
                                ))}
                            {searchCountry && countryRecipe.map((recipe) => (
                                    <Card recipe={recipe} key={recipe.id} />
                                ))}
                            {searchTagRecipe && tagRecipe.map((recipe) => (
                                    <Card recipe={recipe} key={recipe.id} />
                                ))}
                        </ul>
                    </div>
                ) : (
                    searchTerm ? (
                        <p className="text-center">No recipes found for "{searchTerm}".</p>
                    ) : searchCountry ? (
                        <p className="text-center">No recipes found from "{searchCountry}".</p>
                    ) : searchTagRecipe ? (
                        <p className="text-center">No recipes found with the tag "{searchTagRecipe}".</p>
                    ) : null
                )}
    
                {tagArticle?.length > 0 ? (
                    <div className="xl:w-[1350px] mx-auto">
                        <ul className="flex flex-wrap gap-10 xl:gap-0">
                            {searchTagArticle &&
                                tagArticle.map((article) => (
                                    <ArticlePost article={article} key={article.id} />
                                ))}
                        </ul>
                    </div>
                ) : searchTagArticle ? (
                    <p className="text-center">No articles found with the tag "{searchTagArticle}".</p>
                ) : null}
            </div>
            <Footer />
        </div>
    );
    
};

export default SearchResult;