import {useRef} from 'react';
import { useSelector } from 'react-redux';

const ArticleForm = () => {
    const user = useSelector((state) => state.userReducer)
    const form = useRef();

    function handleFormSubmit(e){
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', form.current[0].value);
        formData.append('description', form.current[1].value);
        formData.append('picture', form.current[2].files);
        formData.append('tags', form.current[3].value);
        formData.append('top', form.current[4].value);

    }
    return (
        <div className="md:translate-x-60 transition-transform duration-500 h-max w-full flex justify-center bg-amber-100">
    <div className="bg-white p-10 my-16 rounded-lg shadow-lg md:-translate-x-32">
        <form onSubmit={handleFormSubmit} ref={form}className="min-w-96 flex flex-col">
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