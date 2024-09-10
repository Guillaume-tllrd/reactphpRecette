import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const FavRecipePost = ({recipe }) => {
    const location = useLocation();

    const img = recipe.recipe_picture;
    const imgPath = "../../../api/" + img;

    const basePath = location.pathname.includes('/favoris') && `/recipes/${recipe.recipe_categorie}/${recipe.recipe_id}`;
    
    return (
        <div className='bg-white p-4 mx-auto w-[250px] shadow-lg'>
            <h1 className='font-scope text-lg'>{recipe.recipe_name}</h1>
            <Link to={basePath} className='text-orange-500 hover:underline hover:text-black'>VIEW RECIPE > </Link>
            <img src={imgPath} alt="recipe picture" />
        </div>
    );
};

export default FavRecipePost;