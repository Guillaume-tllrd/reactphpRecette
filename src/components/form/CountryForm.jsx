import { useDispatch } from 'react-redux';
import { getCountryRecipe } from '../../Redux/actions/recipe.actions';
import { useNavigate } from 'react-router-dom';

const CountryForm = ({recipe}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    function handleCountrySubmit(e){
        e.preventDefault();
        const country = e.target.value;
        dispatch(getCountryRecipe());
        navigate(`/searchResult?country=${country}`);
        
    }
    return (
        <div>
            <form className='mx-2 mb-2 md:mx-3 lg:mx-5 xl:mx-7 2xl:mx-9 font-semibold'>Country: <button onClick={handleCountrySubmit} className='hover:underline font-light' value={recipe.country}>{recipe.country}</button>
            </form> 
        </div>
    );
};

export default CountryForm;