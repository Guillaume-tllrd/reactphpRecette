import React from 'react';
import { Link } from 'react-router-dom';

const CardsRecipesIndex = ({recipe}) => {

const img = recipe.picture_1;
const imgPath = "../../../api/" + img;

    return (
        <div className='bg-white'>
            <h1>{recipe.name}</h1>
            <Link className='text-orange-500 hover:underline hover:text-black'>VIEW RECIPE > </Link>
            <img src={imgPath} alt="" />
        </div>
    );
};

export default CardsRecipesIndex;