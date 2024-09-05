import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Caroussel from '../components/Caroussel';
import { useEffect } from 'react';
import Category from '../components/Category';
import { useDispatch, useSelector } from 'react-redux';
import {  getRecipeByCategory } from '../Redux/actions/recipe.actions';
import { isEmpty } from '../components/Utils';

const Recipes = () => {
    const dispatch = useDispatch();
    const recipesByCategory = useSelector((state) => state.recipeReducer.recipesByCategory) // ne pâs oublier recipesByCategory après le reducer sinon ça prend également en compte recpe

    // console.log(recipesByCategory)

    useEffect(() => {
        dispatch(getRecipeByCategory())
    }, [dispatch]); 

//    console.log(recipesByCategory)
    return (
        <div>
            <Header />
            <Caroussel />
            <div className="bg-amber-100">
                <h1 className="py-5 text-center font-scope text-3xl">Recipes</h1>
                {recipesByCategory.map(categoryData => (
                    <Category 
                        key={categoryData.category} 
                        category={categoryData.category} 
                        recipes={categoryData.recipes}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Recipes;
