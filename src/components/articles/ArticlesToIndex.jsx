import { useSelector } from 'react-redux';
import ArticlesCardsIndex from './ArticlesCardsIndex';

const ArticlesToIndex = () => {
    const articles = useSelector((state => state.articleReducer.articlesToIndex));

    return (
        <div className='bg-amber-100'>
            <ul className='flex'>
                {articles.map((article) => <ArticlesCardsIndex article={article} key={article.id} />)}
            </ul>
        </div>
    );
};

export default ArticlesToIndex;