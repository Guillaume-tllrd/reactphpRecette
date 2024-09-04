
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Caroussel from '../components/Caroussel';
import axios from 'axios';
import { useEffect, useState } from 'react';
// page des 4 catégories
const Recipes = () => {
    
    useEffect(() => {
        axios.get("http://localhost:8005/recipes.php?categoryLimit=true").then((res) => console.log(res.data))
    },[])

    // axios.get("http://localhost:8005/recipes.php")
    // .then(response => {
    //     const recipes = response.data;
        
    //     // Filtrer et limiter à 3 recettes par catégorie
    //     const categories = ["breakfast", "main", "dessert", "appetizer"];
    //     const recipesByCategory = categories.map(category => {
    //         return {
    //             category: category,
    //             recipes: recipes.filter(recipe => recipe.categories === category).slice(0, 3)
    //         };
    //     });

    //     // Utilisation des recettes filtrées dans l'UI
    //     recipesByCategory.forEach(categoryData => {
    //         console.log(`Category: ${categoryData.category}`, categoryData.recipes);
    //         // Ajoute ici le code pour rendre les recettes dans ton interface utilisateur
    //     });
    // })
    // .catch(error => {
    //     console.error("Error fetching recipes:", error);
    // });
    return (
        <div>
            <Header/>
            <Caroussel/>
            
            <Footer/>
        </div>
    );
};

export default Recipes;