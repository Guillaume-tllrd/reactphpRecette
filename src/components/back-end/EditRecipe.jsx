import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { editRecipe } from '../../Redux/actions/recipe.actions';

const EditRecipe = ({recipe, onCloseEditModal}) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    console.log(onCloseEditModal)
    
    const dispatch = useDispatch();
    


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Avec la requête put formData(new Formdata) ne semble pas fonctionné
        const EditformData = {
            id: recipe.id,
            name: recipe.name,
            ingredients: recipe.ingredients,
            summary: recipe.summary,
            description: recipe.description,
            tags: recipe.tags, 
            country: recipe.country,
            categories: recipe.categories,
            difficulty: recipe.difficulty,
            number_of_servings: recipe.number_of_servings,
            prep_time: recipe.prep_time,
            cooking_time: recipe.cooking_time,
            top: recipe.top,
            background: recipe.background,
        }

            try {
                await dispatch(editRecipe(EditformData));
                setSuccess('Recipe updated successfully!');
                
                // ne pas oublier de mette le getPost directement ici pour ne pas avoir à actualiser la page qd on ajoute
            } catch (error) {
                setError('An error occurred during registration');
                setSuccess(null);
            }
        
    }
 
    return (
        <div className=" h-max w-full flex justify-center bg-amber-100">
            <div className="bg-white p-10 my-16 rounded-lg shadow-lg">
        <form onSubmit={handleFormSubmit} className="min-w-96 flex flex-col">
            {error && <p style ={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>{success}</p>}
        <h2 className="text-2xl text-center font-scope font-bold mb-6">Edit the {recipe.name}'s recipe</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2 text-center">
                    Name
                    <input
                        id="name"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="text"
                        name="name"
                        defaultValue={recipe.name}
                    />
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="ingredients" className="block text-gray-700 mb-2 text-center">
                    Ingredients
                    <textarea
                        id="ingredients"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        name="ingredients"
                        defaultValue={recipe.ingredients}
                    ></textarea>
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="summary" className="block text-gray-700 mb-2 text-center">
                    Summary
                    <textarea
                        id="summary"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        name="summary"
                        defaultValue={recipe.summary}
                    ></textarea>
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 mb-2 text-center">
                    Description
                    <textarea
                        id="description"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        name="description"
                        defaultValue={recipe.description}
                    ></textarea>
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="tags" className="block text-gray-700 mb-2 text-center">
                    Tags
                    <input
                        id="tags"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="text"
                        name="tags"
                        defaultValue={recipe.tags}
                    />
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="country" className="block text-gray-700 mb-2 text-center">
                    Country
                    <input
                        id="country"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="text"
                        name="country"
                        defaultValue={recipe.country}
                    />
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="categories" className="block text-gray-700 mb-2 text-center">
                    Categories
                    <select
                        id="categories"
                        className="w-full mt-1 border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        name="categories"
                        defaultValue={recipe.categories}
                    >
                        <option className="text-center" value="breakfast">Breakfast</option>
                        <option className="text-center" value="main">Main</option>
                        <option className="text-center" value="dessert">Dessert</option>
                        <option className="text-center" value="appetizer">Appetizer</option>
                        
                    </select>
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="difficulty" className="block text-gray-700 mb-2 text-center">
                    Difficulty
                    <select
                        id="difficulty"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="text"
                        name="difficulty"
                        defaultValue={recipe.difficulty}
                    >
                        <option className="text-center" value="easy">Easy</option>
                        <option className="text-center" value="medium">Medium</option>
                        <option className="text-center" value="hard">Hard</option>
                    </select>
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="number_of_servings" className="block text-gray-700 mb-2 text-center">
                    Number of Servings
                    <input
                        id="number_of_servings"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500 text-center"
                        type="number"
                        name="number_of_servings"
                        defaultValue={recipe.number_of_servings}
                    />
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="prep_time" className="block text-gray-700 mb-2 text-center">
                    Prep Time (minutes)
                    <input
                        id="prep_time"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500 text-center"
                        type="number"
                        name="prep_time"
                        defaultValue={recipe.prep_time}
                    />
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="cooking_time" className="block text-gray-700 mb-2 text-center">
                    Cooking Time (minutes)
                    <input
                        id="cooking_time"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500 text-center"
                        type="number"
                        name="cooking_time"
                        defaultValue={recipe.cooking_time}
                    />
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="top" className="block text-gray-700 mb-2 text-center">
                    Top
                    <select
                        id="top"
                        className="w-full mt-1 border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        name="top"
                        defaultValue={recipe.top}
                    >
                        <option className="text-center" value="yes">Yes</option>
                        <option className="text-center" value="no">No</option>
                    </select>
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="background" className="block text-gray-700 mb-2 text-center">
                    Background
                    <select
                        id="background"
                        className="w-full mt-1 border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        name="background"
                        defaultValue={recipe.background}
                    >
                        <option className="text-center" value="yes">Yes</option>
                        <option className="text-center" value="no">No</option>
                    </select>
                </label>
            </div>

            <button
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
                type="submit"
            >
                Submit
            </button>
        </form>
    </div>
</div>

    );
};

export default EditRecipe;