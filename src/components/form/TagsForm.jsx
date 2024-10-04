import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTagRecipe } from '../../Redux/actions/recipe.actions';

const TagsForm = ({recipe}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const rawTags= recipe.tags || '';
    const tagsArray = rawTags.split('.')
    .map(tag => tag.trim());

    function handleTagClick(tag) {
        dispatch(getTagRecipe(tag));
        navigate(`/searchResult?tag=${tag}`);
    }
    return (
        <div>
            <form onSubmit={handleTagClick} className='mx-2 md:mx-3 lg:mx-5 xl:mx-7 2xl:mx-9 font-semibold'>Tags : {tagsArray.map((tag, index) => ( <button  onClick={() => handleTagClick(tag)} key={index} className='hover:underline pr-1 font-light'>{tag}</button>))}
            </form>
        </div>
    );
};

export default TagsForm;