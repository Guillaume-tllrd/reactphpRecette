import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UsersRound, HandPlatter, Timer, ChefHat } from 'lucide-react';

//Page d'une seule recette
const RecipePage = () => {
    const param = useParams();
    const id = param.id;
    const [recipe , setRecipe] = useState([]); //on met un set loading pour attendre les données
    const [loading, setLoading] = useState(true);
    const img = recipe.picture_1;
    const imgPath= "../../api/" + img;

    const rawIngredients = recipe.ingredients || ''; //on vérifie si les données sont chargées sinon ça ne fonctione pas
    const ingredientsArray = rawIngredients.split('.')
        .map(ingredient => ingredient.trim()) // trim enlève les espace superflu au début et à la fin
        .filter(ingredient => ingredient !== ""); // Supprime les éléments vides du tableau (au cas où il y aurait un point final ou des espaces en trop
    console.log(ingredientsArray)
    useEffect(() => {
        axios.get(`http://localhost:8005/recipes.php?id=${id}`).then((res) => {
            setRecipe(res.data[0]);
            setLoading(false);
        })

    },[])

    return (
        <div>
            <Header/>
            <div className='bg-amber-100 p-10'>
                <div className='bg-white mx-auto'>
                   {loading ? (<h1>Loading...</h1>) : (
                    <>
                <h1 className='font-scope text-center text-xl'>{recipe.name}</h1>
                <p>Tags : {recipe.tags.split('.')}</p>
                <p>Country: {recipe.country}</p>
                <img src={imgPath} alt="picture recipe" />
                <div className='flex'>
                    <div>Number of serving: {recipe.number_of_servings}</div>
                    <div>Difficulty: {recipe.difficulty}</div>
                    <div>Preparation time: {recipe.prep_time} min</div>
                    <div>Cooking time: {recipe.cooking_time} min</div>
                </div>
                <div>
                    <div className='xl:flex bg-amber-50 mx-8'>
                        <h2 className='font-scope text-lg text-center'>Ingrédients</h2>
                        <ul>
                        {ingredientsArray.length > 0 ? (
                                    ingredientsArray.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))
                                ) : (
                                    <li>Aucun ingrédient disponible</li>
                                )}
                        </ul>
                    </div>
                </div>
                    </>
                )}
                </div>
                  
                
            </div>
            <Footer/>
        </div>
    );
};

export default RecipePage;