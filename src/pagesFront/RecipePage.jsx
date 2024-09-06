import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { useParams, Link } from 'react-router-dom';
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
    .filter(ingredient => ingredient !== "")// Supprime les éléments vides du tableau (au cas où il y aurait un point final ou des espaces en trop
    .map(ingredient => ingredient.trim() + '.'); // trim enlève les espace superflu au début et à la fin
        
    const rawDescription = recipe.description || '';
    const descriptionArray = rawDescription.split(".")
    .filter(sentence => sentence !== "")
    .map(sentence => sentence.trim() + '.');

    const rawTags= recipe.tags || '';
    const tagsArray = rawTags.split('.')
    .map(tag => tag.trim());

    console.log(rawTags);
    console.log(tagsArray)
    useEffect(() => {
        axios.get(`http://localhost:8005/recipes.php?id=${id}`).then((res) => {
            setRecipe(res.data[0]);
            setLoading(false);
        })

    },[])

    return (
        <div>
            <Header/>
            <div className='bg-amber-100 p-8 md:p-10 '>
                <div className='bg-white mx-auto'>
                   {loading ? (<h1>Loading...</h1>) : (
                    <>
                <h1 className='font-scope py-2 text-center text-2xl'>{recipe.name}</h1>
                <p className='mx-2 md:mx-3 lg:mx-5 xl:mx-7 2xl:mx-9 font-semibold'>Tags : {tagsArray.map((tag, index) => ( <Link key={index} className='hover:underline pr-1 font-light'>{tag}</Link>) )}</p>
                <p className='mx-2 mb-2 md:mx-3 lg:mx-5 xl:mx-7 2xl:mx-9 font-semibold'>Country: <Link className='hover:underline font-light'>{recipe.country}</Link></p>
                <div className='xl:flex'>
                    <img className="mx-auto xl:mx-28 xl:mb-5" src={imgPath} alt="picture recipe" /> 
                    <div className="flex justify-around items-center bg-white p-4 ">
                        <div className="flex-1 text-center p-2 border-r border-gray-300">
                            <UsersRound className="inline-block w-6 h-6 text-amber-700 mb-1" />
                            <div className="font-semibold text-sm text-gray-700">Servings</div>
                            <div className="text-lg text-amber-700">{recipe.number_of_servings}</div>
                        </div>
                        <div className="flex-1 text-center p-2 border-r border-gray-300">
                            <HandPlatter className="inline-block w-6 h-6 text-amber-700 mb-1" />
                            <div className="font-semibold text-sm text-gray-700">Difficulty</div>
                            <div className="text-lg text-amber-700">{recipe.difficulty}</div>
                        </div>
                        <div className="flex-1 text-center p-2 border-r border-gray-300">
                            <Timer className="inline-block w-6 h-6 text-amber-700 mb-1" />
                            <div className="font-semibold text-sm text-gray-700">Prep Time</div>
                            <div className="text-lg text-amber-700">{recipe.prep_time} min</div>
                        </div>
                        <div className="flex-1 text-center p-2">
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
                            <h2 className='font-scope text-lg text-center py-2'>Recipe instruction</h2>
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
            <Footer/>
        </div>
    );
};

export default RecipePage;