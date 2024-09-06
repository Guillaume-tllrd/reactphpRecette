import {useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addArticle } from '../../Redux/actions/article.actions';

const ArticleForm = () => {
    const user = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const form = useRef();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', form.current[0].value);
        formData.append('description', form.current[1].value);
        formData.append('picture', form.current[2].files[0]);// files est un array donc il faut prendre le 1er fichier
        formData.append('tags', form.current[3].value);
        formData.append('top', form.current[4].value);
        formData.append("user_name", user.username);
        formData.append("date", new Date().toISOString().split('T')[0]);


        try{
            await dispatch(addArticle(formData));
            setSuccess('Recipe created succesfully!')
            form.current.reset();
        } catch {
            setError("An error occured during registration");
            setSuccess(null)
        }
        
    }
    
    return (

        <div className="md:translate-x-60 transition-transform duration-500 h-max w-full flex justify-center bg-amber-100">
    <div className="bg-white p-10 my-16 rounded-lg shadow-lg md:-translate-x-32">
        <form onSubmit={handleFormSubmit} ref={form} className="min-w-96 flex flex-col">
            {error && <p style ={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>{success}</p>}
        <h2 className="text-2xl text-center font-scope font-bold mb-6">Create your article</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 mb-2 text-center">
                    Title
                    <input
                        id="title"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="text"
                        name="title"
                    />
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 mb-2 text-center">
                    Description
                    <textarea
                        id="description"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        name="description"
                    ></textarea>
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="picture" className="block text-gray-700 mb-2 text-center">
                    Picture
                    <input
                        id="picture"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        type="file"
                        name="picture"
                        accept="image/*"
                    />
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
                    />
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="top" className="block text-gray-700 mb-2 text-center">
                    Top
                    <select
                        id="top"
                        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-orange-500"
                        name="top"
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

export default ArticleForm;