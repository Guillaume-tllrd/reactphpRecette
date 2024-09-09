import React from 'react';
import { Link } from 'react-router-dom';

const ArticlesCardsIndex = ({article, className}) => {

    const img = article.picture;
    const imgPath = "../../../api/" + img;

    return (
        <div className={`bg-white p-4 mx-auto max-w-[525px] shadow-lg ${className}`}>
            <h1 className='font-scope text-lg'>{article.title}</h1>
            <Link to={`articles/${article.id}`} className='text-orange-500 hover:underline hover:text-black'>VIEW RECIPE > </Link>
            <img src={imgPath} alt="recipe picture" />
        </div>
    );
};

export default ArticlesCardsIndex;