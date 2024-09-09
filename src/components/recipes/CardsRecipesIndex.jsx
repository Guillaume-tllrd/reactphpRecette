import React from 'react';
import { Link } from 'react-router-dom';

const CardsRecipesIndex = ({recipe}) => {

const img = recipe.picture_1;
const imgPath = "../../../api/" + img;

    return (
        <div className='bg-white p-4 mx-auto max-w-[525px] shadow-lg'>
            <h1 className='font-scope text-lg'>{recipe.name}</h1>
            <Link to={`recipes/${recipe.categories}/${recipe.id}`} className='text-orange-500 hover:underline hover:text-black'>VIEW RECIPE > </Link>
            <img src={imgPath} alt="recipe picture" />
        </div>
                
    );
};

export default CardsRecipesIndex;