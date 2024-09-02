import React, {useRef} from 'react';

const RecipeForm = () => {
    const form = useRef()

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const recipeData = {
            name: form.current[0].value,
            ingredients: form.current[1].value,
            summary: form.current[2].value,
            description: form.current[3].value,
            tags: form.current[4].value,
            country: form.current[5].value,
            picture1: form.current[6].value,
            picture2: form.current[7].value,
            picture3: form.current[8].value,
            categories: form.current[9].value,
            difficulty: form.current[10].value,
            number_of_servings: form.current[11].value,
            prep_time: form.current[12].value,
            cooking_time: form.current[13].value,
            top: form.current[14].value,
        }
        form.current.reset();
    }
    return (
        <div className="flex h-full bg-amber-100">

            <div className="bg-white p-10 my-16 rounded-lg shadow-lg">
            <form onSubmit={handleFormSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name" 
                        />
                </label>

                <label>
                    Ingredients:
                    <textarea 
                        name="ingredients" 
                        />
                </label>

                <label>
                    Summary:
                    <textarea 
                        name="summary" 
                        />
                </label>

                <label>
                    Description:
                    <textarea 
                        name="description" 
                        />
                </label>

                <label>
                    Tags:
                    <input 
                        type="text" 
                        name="tags" 
                        />
                </label>

                <label>
                    Country:
                    <input 
                        type="text" 
                        name="country" 
                        />
                </label>

                <label>
                    Picture 1:
                    <input 
                        type="text" 
                        name="picture1" 
                        />
                </label>

                <label>
                    Picture 2:
                    <input 
                        type="text" 
                        name="picture2" 
                        />
                </label>

                <label>
                    Picture 3:
                    <input 
                        type="text" 
                        name="picture3" 
                        />
                </label>

                <label>
                    Categories:
                    <input 
                        type="text" 
                        name="categories" 
                        />
                </label>

                <label>
                    Difficulty:
                    <input 
                        type="text" 
                        name="difficulty" 
                        />
                </label>

                <label>
                    Number of Servings:
                    <input 
                        type="number" 
                        name="number_of_servings" 
                        />
                </label>

                <label>
                    Prep Time (minutes):
                    <input 
                        type="number" 
                        name="prep_time" 
                        />
                </label>

                <label>
                    Cooking Time (minutes):
                    <input 
                        type="number" 
                        name="cooking_time" 
                        />
                </label>

                <label>
                    Top:
                    <input 
                        type="number" 
                        name="top" 
                        />
                </label>

                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default RecipeForm;