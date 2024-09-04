import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Caroussel from '../components/Caroussel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Category from '../components/Category';

const Recipes = () => {
    const [recipesByCategory, setRecipesByCategory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8005/recipes.php?categoryLimit=true")
        .then(response => {
            const recipes = response.data;
            
            // Filtrer en fonction du nom de la catégorie
            const categories = ["breakfast", "main", "dessert", "appetizer"];
            const recipesByCategory = categories.map(category => {
                return {
                    category: category,
                    recipes: recipes.filter(recipe => recipe.categories === category)
                };
            });

            
            setRecipesByCategory(recipesByCategory);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
    }, []); 

    return (
        <div>
            <Header />
            <Caroussel />
            <div className="bg-amber-100">
                <h1 className="py-5 text-center font-scope text-3xl">Recipes</h1>
                {recipesByCategory.map(categoryData => (
                    <Category key={categoryData.category} 
                    category={categoryData.category} recipes={categoryData.recipes} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Recipes;
