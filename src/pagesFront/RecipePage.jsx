import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UsersRound, HandPlatter, Timer, ChefHat } from 'lucide-react';
import LikedRecipes from '../components/recipes/LikedRecipes';
import CommentArea from '../components/comments/commentArea';
import CountryForm from '../components/form/countryForm';
import TagsRecipeForm from '../components/form/TagsRecipeForm';

//Page d'une seule recette
const RecipePage = () => {
    const param = useParams();
    const id = param.id;
    const [recipe , setRecipe] = useState([]); //on met un set loading pour attendre les données
    const [loading, setLoading] = useState(true);
    
    const img = recipe.picture_1;
    const imgPath= "../../api/" + img;
    
    const rawIngredients = recipe.ingredients || ''; 
    console.log('ingredient:', rawIngredients);

    console.log('filtered ingredient :', rawIngredients.split('.') .filter(ingredient => ingredient !== ""));


    const ingredientsArray = rawIngredients.split('.')
    .filter(ingredient => ingredient !== "")// Supprime les éléments vides du tableau (au cas où il y aurait un point final ou des espaces en trop
    .map(ingredient => ingredient.trim() + '.'); // trim enlève les espace superflu au début et à la fin
        
    const rawDescription = recipe.description || '';
    const descriptionArray = rawDescription.split(".")
    .filter(sentence => sentence !== "")
    .map(sentence => sentence.trim() + '.');

    useEffect(() => {
        axios.get(`http://localhost:8005/recipes.php?id=${id}`).then((res) => {
            setRecipe(res.data[0]);
            setLoading(false);
        })
    },[]);

    
    return (
        <div>
            <Header/>
            <div className='bg-amber-100 p-8 md:p-10 '>
                <div className='bg-white mx-auto'>
                   {loading ? (<h1>Loading...</h1>) : (
                    <>
                <h1 className='font-scope py-2 text-center text-2xl'>{recipe.name}</h1>
                <div className='flex justify-between'>
                    <div>
                        <TagsRecipeForm recipe={recipe}/>
                        <CountryForm recipe={recipe}/>
                    </div>
                    
                <LikedRecipes recipe={recipe}/>
                </div>
                
                <div className='xl:flex xl:items-center'> 
                    {/* le items-center qui me permet de centrer à la verticale le grid */}
                    <img className="mx-auto xl:mx-9 xl:mb-5 2xl:ml-32" src={imgPath} alt="picture recipe" /> 
                    <div className="flex bg-white p-4 xl:grid xl:grid-cols-2 xl:grid-rows-2 xl:w-full xl:h-full xl:p-0 xl:pr-9 2xl:px-16">
                        <div className="flex-1 text-center p-2 border-r xl:border-b border-gray-300 xl:border-r">
                            <UsersRound className="inline-block w-6 h-6 text-amber-700 mb-1" />
                            <div className="font-semibold text-sm text-gray-700">Servings</div>
                            <div className="text-lg text-amber-700">{recipe.number_of_servings}</div>
                        </div>
                        <div className="flex-1 text-center p-2 border-r xl:border-b border-gray-300 xl:border-r-0 xl:row-span-1 xl:col-span-1">
                            <HandPlatter className="inline-block w-6 h-6 text-amber-700 mb-1" />
                            <div className="font-semibold text-sm text-gray-700">Difficulty</div>
                            <div className="text-lg text-amber-700">{recipe.difficulty}</div>
                        </div>
                        <div className="flex-1 text-center p-2 border-r border-gray-300 xl:border-r xl:row-span-1 xl:col-span-1">
                            <Timer className="inline-block w-6 h-6 text-amber-700 mb-1" />
                            <div className="font-semibold text-sm text-gray-700">Prep Time</div>
                            <div className="text-lg text-amber-700">{recipe.prep_time} min</div>
                        </div>
                        <div className="flex-1 text-center p-2 xl:border-none xl:row-span-1 xl:col-span-1">
                            <ChefHat className="inline-block w-6 h-6 text-amber-700 mb-1" />
                            <div className="font-semibold text-sm text-gray-700">Cooking Time</div>
                            <div className="text-lg text-amber-700">{recipe.cooking_time} min</div>
                        </div>
                    </div>
                </div>
                

                <div>
                    <div className='lg:flex '>
                        <div className='bg-amber-50 mx-8 px-4 pt-2 pb-4 lg:mb-4 min-w-72'>
                            <h2 className='font-scope text-lg text-center '>Ingrédients</h2>
                            <ul>
                                {ingredientsArray.length > 0 ? (
                                        ingredientsArray.map((ingredient, index) => (
                                            <li key={index}>-{ingredient}</li>
                                        ))
                                    ) : (
                                        <p>No ingredients available</p>
                                    )}
                            </ul>
                        </div>
                        <div className='mx-8 pb-4'>
                            <h2 className='font-scope text-lg text-center lg:text-start py-2'>Recipe instruction</h2>
                            <ul>
                               {descriptionArray.length > 0 ? (
                                descriptionArray.map((sentence, index) => (
                                    <li key={index}><span className='text-lg font-semibold text-amber-700'>{index + 1}.</span> {sentence}</li>
                                ))
                               ) : (
                                <p>No instructions available</p>
                               )
                            }
                            </ul>
                        </div>
                    </div>
                </div>
                    </>
                )}
                </div>
            </div>
            <CommentArea recipe={recipe}/>
            <Footer/>
        </div>
    );
};

export default RecipePage;