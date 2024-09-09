import React from 'react';
import { useSelector } from 'react-redux';
import CardsRecipesIndex from './CardsRecipesIndex';

const FourRecipesToIndex = () => {
    const fourRecipes = useSelector((state) => state.recipeReducer.recipesToIndex)
    console.log(fourRecipes)
    return (
        <div className='bg-amber-100'>
            <h1 className='font-scope py-5 text-2xl text-center'>Discover recipes for every occasion, <br/>ingredient, and skill level.</h1>
            <div className='2xl:w-[1350px] mx-auto'>
                <ul className='flex flex-wrap'>{fourRecipes.map((recipe) => <CardsRecipesIndex recipe={recipe} key={recipe.id} />)}</ul>
            </div>
        </div>
    );
};

export default FourRecipesToIndex;