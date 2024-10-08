import { useEffect, useState } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { useDispatch, useSelector } from 'react-redux';
import recipeReducer from '../../Redux/reducers/recipe.reducer';
import { fetchAllRecipes } from '../../Redux/actions/recipe.actions';

const RecipeTable = () => {

    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipeReducer.recipes);

    useEffect(() => {
        dispatch(fetchAllRecipes())
    }, [dispatch]); // Le tableau de dépendances vide pour éviter le rechargement infini

    
    return (
        <div className="w-full my-4">
            <table className="hidden w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-lg bg-gray-50 text-left text-sm font-normal ">
                    <tr className='border-white'>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Name</th>
                        <th scope="col" className="px-3 py-5 font-medium text-center">Ingredients</th>
                        <th scope="col" className="px-3 py-5 font-medium text-center">Picture 1</th>
                        <th scope="col" className="px-3 py-5 font-medium text-center">Picture 2</th>
                        <th scope="col" className="px-3 py-5 font-medium text-center">Description</th>
                        <th scope="col" className="py-3 pl-6 pr-3 font-medium text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="rounded-lg bg-white text-left text-sm font-normal border">
                    {recipes && recipes.length > 0 ? (
                        
                        recipes.map((recipe) => (
                            <TableRow recipe={recipe} key={recipe.id}/>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No recipes available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RecipeTable;
