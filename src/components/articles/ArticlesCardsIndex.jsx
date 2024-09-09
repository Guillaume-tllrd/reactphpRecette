import React from 'react';
import { Link } from 'react-router-dom';

const ArticlesCardsIndex = ({article}) => {

    const img = article.picture;
    const imgPath = "../../../api/" + img;

    return (
        <div className='bg-white mb-12 p-4 mx-auto max-w-[525px] shadow-lg'>
            <h1 className='font-scope text-lg'>{article.title}</h1>
            <Link to={`articles/${article.id}`} className='text-orange-500 hover:underline hover:text-black'>VIEW RECIPE > </Link>
            <img src={imgPath} alt="recipe picture" />
        </div>
    );
};

export default ArticlesCardsIndex;