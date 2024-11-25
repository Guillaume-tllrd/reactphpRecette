import Card from './Card';
import { Link, useLocation } from 'react-router-dom';

const Category = ({recipes, category}) => {

const location = useLocation();

    return (
        <div className='mx-5 pb-5'>
            <h1 className='font-scope text-2xl text-center mb-6'>{category.slice(0,1).toUpperCase()+ category.slice(1)}</h1>
            <div className='xl:w-[1350px] mx-auto'>
                <ul className='flex flex-wrap gap-10 xl:gap-0'>{recipes.map((recipe) => (
                <Card recipe={recipe} key={recipe.id} />
            ))}</ul>
            </div>
            {/* condition pour afficher le view more */}

            {location.pathname.includes(`/recipes/${category}`) || recipes.length < 3 ? ("") 
                : (
                    <div className='text-center '><Link to={`${category}`} className='text-center font-semibold underline hover:text-gray-600'>VIEW MORE</Link></div>
                )}
         
        </div>
    );
};

export default Category;