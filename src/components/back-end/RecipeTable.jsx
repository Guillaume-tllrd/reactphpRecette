import { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeTable = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8005/recipes.php")
            .then((res) => setRecipes(res.data))
            .catch((err) => console.error("Failed to fetch recipes", err));
    }, []); // Le tableau de dépendances vide pour éviter le rechargement infini

    
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
                            <tr key={recipe.id} className='border-b'> 
                                <td className="px-4 py-5 font-medium border sm:pl-6">{recipe.name}</td>
                                <td className="px-3 py-5 font-medium border">{recipe.ingredients}</td>
                                {/* {const img1 = recipe.picture_1;
                                const imgPath1= "../../../api/" + img1;} */}
                                <td className="px-3 py-5 font-medium border">
                                  {/* {imgPath1}  */}
                                </td>
                                <td className="px-3 py-5 font-medium border">
                                    <img src={recipe.picture2} alt={recipe.name} className="w-16 h-16 object-cover" />
                                </td>
                                <td className="px-3 py-5 font-medium border">{recipe.description}</td>
                                <td className="py-3 pl-6 pr-3 font-medium border">
                                    <button className="text-blue-500 hover:underline">Edit</button>
                                    <button className="ml-2 text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
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
