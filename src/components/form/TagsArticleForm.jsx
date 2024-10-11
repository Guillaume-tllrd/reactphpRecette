import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTagArticle } from "../../Redux/actions/article.actions";

const TagsArticleForm = ({articleData}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const rawTags= articleData.tags || '';
    const tagsArray = rawTags.split('.')
    .map(tag => tag.trim());

    function handleTagClick(tag){
        dispatch(getTagArticle(tag));
        navigate(`/searchResult?tagArticle=${tag}`)
    }

    return (
        <div>
            <form className='mx-2 mb-2 md:mx-3 lg:mx-5 xl:mx-7 2xl:mx-9 font-semibold'>Tags : {tagsArray.map((tag, index) => ( <button onClick={() => handleTagClick(tag)} key={index} className='hover:underline pr-1 font-light'>{tag}</button>) )}</form>
        </div>

    );
};

export default TagsArticleForm;