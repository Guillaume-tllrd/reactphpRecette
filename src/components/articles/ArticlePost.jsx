import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ArticlePost = ({article}) => {
    const location = useLocation();

    const img = article.picture;
    const imgPath= "../../api/" + img;

    const basePath = location.pathname.includes(`/searchResult/${article.id}`)
   ? `/articles/${article.id}` // Already in category path, only add the ID
   : `/articles/${article.id}`;

    return (
        <div className='bg-white p-4 shadow-lg mb-12 mx-auto '>
            <h1 className='font-scope text-lg'>{article.title}</h1>
            <Link to={`${basePath}`} className='text-orange-500 hover:underline hover:text-black'>VIEW ARTICLE > </Link>
                <img src={imgPath} alt="article picture" />
        </div>
    );
};

export default ArticlePost;