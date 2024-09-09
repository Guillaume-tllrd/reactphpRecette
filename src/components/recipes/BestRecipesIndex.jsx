import React from 'react';
import { useSelector } from 'react-redux';
import CardsRecipesIndex from './CardsRecipesIndex';

const BestRecipesIndex = () => {
    const bestRecipes = useSelector((state) => state.recipeReducer.bestRecipesToIndex);
    console.log(bestRecipes);
    return (
        <div className='bg-amber-100'>
            <h1 className='font-scope py-6 text-2xl text-center'>Our best research</h1>
            <div>
                <ul>{bestRecipes.map((recipe) => <CardsRecipesIndex recipe={recipe} key={recipe.id}/>)}</ul>
            </div>
        </div>
    );
};

export default BestRecipesIndex;