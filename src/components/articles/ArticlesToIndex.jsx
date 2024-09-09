import { useSelector } from 'react-redux';
import ArticlesCardsIndex from './ArticlesCardsIndex';

const ArticlesToIndex = () => {
    const articles = useSelector((state => state.articleReducer.articlesToIndex));

    return (
        <div className='bg-amber-100'>
            <h1 className='font-scope text-center text-2xl p-6'>Discover our articles of the month </h1>

            <ul className='flex  gap-16 max-w-[1200px] mx-auto'>
                {articles.map((article, index) => <ArticlesCardsIndex article={article} key={article.id}  className={`${
                            index === 0 
                                ? 'block  lg:max-w-[60%]' 
                                : 'hidden lg:block  lg:max-w-[20%]'
                        }`}/>)}
            </ul>
        </div>
    );
};

export default ArticlesToIndex;