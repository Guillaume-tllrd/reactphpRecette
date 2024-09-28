import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { getSearchRecipes } from '../../Redux/actions/recipe.actions';

const Searchbar = () => {
const dispatch = useDispatch();
    function handleSearchSubmit(e){
        e.preventDefault()
        const searchRecipe = e.target.value;
        dispatch(getSearchRecipes(searchRecipe))
        console.log(searchRecipe)
    }
    return (
        <form className='relative flex items-center max-w-md mx-auto my-4'>  
        {/* pour centrer mx-auto */}
            <button onClick={handleSearchSubmit} type='submit'  className='absolute left-3' ><Search className='text-gray-500' /></button>
            <input
                type="search"
                id="searchbar"
                placeholder="Search your recipe..."
                className='pl-10 w-full p-2 border border-gray-300 rounded-3xl  focus:outline-none forcus:ring-2 focus:border-orange-500 '
                />
            </form>
       
    );
};

export default Searchbar;
