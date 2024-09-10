import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { deleteFavoritesRecipe, fetchFavoritesRecipes } from '../../Redux/actions/favoritesRecipe.actions';

const FavRecipePost = ({recipe }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [showMessage, setShowMessage] = useState(false);
    const user = useSelector((state) => state.userReducer);

    const handleDeleteRecipe = () => {
        dispatch(deleteFavoritesRecipe(recipe.recipe_id, user.id)) 
            .then(() => {
                dispatch(fetchFavoritesRecipes(user.id)); // le delete est une fonction asynchrone donc elle prend du temps, avec le then on attend que le delete soit effectué pour lancer le nouveau fetch
            });
    };
    

    const img = recipe.recipe_picture;
    const imgPath = "../../../api/" + img;

    const basePath = location.pathname.includes('/favoris') && `/recipes/${recipe.recipe_categorie}/${recipe.recipe_id}`;
    
    return (
        <div 
        className='relative bg-white p-4 w-[250px] shadow-lg'>
                <button onClick={handleDeleteRecipe} className='absolute right-3'><X onMouseEnter={() => setShowMessage(true)}
                        onMouseLeave={() => setShowMessage(false)} className='text-gray-200 hover:text-black'/></button>
                {showMessage && (
                            <div className="absolute mb-2 left-1/2 transform translate-x-1/2 -translate-y-full p-2 bg-orange-500 text-white text-xs rounded shadow-lg">
                                Are you sure you want to delete this recipe?
                            </div>
                        )}
            
            <h1 className='font-scope text-lg'>{recipe.recipe_name}</h1>
            <Link to={basePath} className='text-orange-500 hover:underline hover:text-black'>VIEW RECIPE > </Link>
            <img src={imgPath} alt="recipe picture" />
        </div>
    );
};

export default FavRecipePost;