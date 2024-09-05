import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
const Category = ({recipes, category}) => {

    return (
        <div className='mx-5 pb-5'>
            <h1 className='font-scope text-2xl pl-2 mb-3'>{category.slice(0,1).toUpperCase()+ category.slice(1)}</h1>
            <ul className='flex flex-wrap gap-5 md:'>{recipes.map((recipe) => (
                <Card recipe={recipe} key={recipe.id} />
            ))}</ul>
            
            <div className='text-center mt-4'><Link className='text-center font-semibold underline hover:text-orange-500'>VIEW MORE</Link></div>
        </div>
    );
};

export default Category;