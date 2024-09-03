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
        <div className="md:translate-x-60 transition-transform duration-500 h-max w-full flex justify-center bg-amber-100">

            <div className="bg-white p-10 my-16 rounded-lg shadow-lg md:-translate-x-32 ">
            <form onSubmit={handleFormSubmit} className="min-w-96 flex flex-col">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center  ">
                    Name
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="text"
                        name="name"
                    />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Ingredients
                    <textarea
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        name="ingredients"
                    ></textarea>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Summary
                    <textarea
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        name="summary"
                    ></textarea>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Description
                    <textarea
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        name="description"
                    ></textarea>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Tags
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="text"
                        name="tags"
                    />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Country
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="text"
                        name="country"
                    />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Picture 1
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="file"
                        name="picture1"
                    />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Picture 2
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="file"
                        name="picture2"
                    />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Picture 3
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="file"
                        name="picture3"
                    />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Categories
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="text"
                        name="categories"
                    />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Difficulty
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="text"
                        name="difficulty"
                    />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Number of Servings
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="number"
                        name="number_of_servings"
                    />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Prep Time (minutes)
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="number"
                        name="prep_time"
                    />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Cooking Time (minutes)
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="number"
                        name="cooking_time"
                    />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-center">
                    Top
                    <input
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="number"
                        name="top"
                    />
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

export default RecipeForm;