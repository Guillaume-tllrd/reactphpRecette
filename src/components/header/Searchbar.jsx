import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { getSearchRecipes } from '../../Redux/actions/recipe.actions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Searchbar = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const [searchRecipe, setSearchRecipe] = useState("");
    function handleSearchSubmit(e){
        e.preventDefault();
        if (searchRecipe.trim() === "") return;  // Si la recherche est vide, on n'envoie pas de requête, le trim permet d'enlever tous les espaces avant et après
        dispatch(getSearchRecipes(searchRecipe));  // Appelle l'action avec la recherche
        navigate(`/searchResult?query=${searchRecipe}`);  // Navigue vers la page des résultats de recherche
        
    }
    return (
        <form className='relative flex items-center max-w-md mx-auto my-4'>  
        {/* pour centrer mx-auto */}
            <button onClick={handleSearchSubmit} type='submit' className='absolute left-3' ><Search className='text-gray-500' /></button>
            <input
                type="search"
                id="searchbar"
                placeholder="Search your recipe..."
                className='pl-10 w-full p-2 border border-gray-300 rounded-3xl  focus:outline-none focus:border-orange-500 '
                onChange={(e) => setSearchRecipe(e.target.value)}
                />
            </form>
       
    );
};

export default Searchbar;
