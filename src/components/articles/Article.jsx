import { getArticles } from "../../Redux/actions/article.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ArticlePost from "./ArticlePost";

const Article = () => {
const dispatch = useDispatch();
const articles = useSelector((state) => state.articleReducer)

useEffect(() => {
    dispatch(getArticles())
},[])

    return (
        <div className='bg-amber-100 h-full'>
            <h1 className='text-center font-scope text-2xl py-4 pb-6'>Articles of the month</h1>
            <section className='flex flex-wrap'>
            {articles.length > 0 ? (articles.map(article => (
                    <ArticlePost 
                        key={article.id} 
                        article={article}
                    />
                ))) : (<p>No articles available.</p>)}
            </section>
        </div>
    );
};

export default Article;