import { Heart } from 'lucide-react';
import {useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipesToFavorites } from '../../Redux/actions/favoritesRecipe.actions';

const LikedRecipes = ({recipe}) => {
    console.log(recipe);
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const user = useSelector((state) => state.userReducer)

    function handleFormSubmit(e){
        e.preventDefault();

        const favoritesRecipesData = {
            user_id : user.id,
            user_name : user.name,
            recipe_id : recipe.id,
            recipe_name: recipe.name,
            recipe_picture: recipe.picture_1,
    }
    if (liked) {
        // dispatch(removeRecipesToFavorites(favoritesRecipesData));
    } else {
        dispatch(addRecipesToFavorites(favoritesRecipesData));
        //penser a garder l'état du liked
    }
}
    return (
        <div className="relative">
            <form onSubmit={handleFormSubmit}>
                {user && user.id ? (
                    <button type="submit">
                        {liked ? (
                            <Heart className='stroke-current text-red-600 fill-red-500 hover:text-black hover:fill-white' />
                        ) : (
                            <Heart className='fill-white hover:fill-red-600 hover:text-red-600' />
                        )}
                    </button>
                ) : (
                    <div
                        onMouseEnter={() => setShowMessage(true)}
                        onMouseLeave={() => setShowMessage(false)}
                        className="relative"
                    >
                        <Heart className='fill-white hover:text-gray-500 cursor-pointer' />
                        {showMessage && (
                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 p-2 bg-orange-500 text-white text-xs rounded shadow-lg">
                                Please log in to add this recipe to your favorites
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default LikedRecipes;