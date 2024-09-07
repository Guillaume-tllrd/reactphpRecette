import React from 'react';
import { Link } from 'react-router-dom';

const ArticlePost = ({article}) => {
    // console.log(article)
    const img = article.picture;
    const imgPath= "../../api/" + img;

    return (
        <div className='bg-white p-4 shadow-lg mb-12 mx-auto '>
            <h1 className='font-scope text-lg'>{article.title}</h1>
            <Link to={`${article.id}`} className='text-orange-500 hover:underline hover:text-black'>VIEW ARTICLE > </Link>
                <img src={imgPath} alt="article picture" />
        </div>
    );
};

export default ArticlePost;