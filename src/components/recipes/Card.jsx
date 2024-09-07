import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Card = ({recipe}) => {
   const location = useLocation();
    // console.log(location);
   
   const basePath = location.pathname.includes(`/recipes/${recipe.categories}`)
   ? `/recipes/${recipe.categories}/${recipe.id}` // Already in category path, only add the ID
   : `/recipes/${recipe.categories}/${recipe.id}`;


    const img = recipe.picture_1;
    const imgPath= "../../api/" + img;
    
    return (
        
            <div className='bg-white w-96 h-[335px] mx-auto mb-5 shadow-lg'><Link to={`${basePath}`}>
                <div className='flex flex-col mx-6'>
                    <h1 className='font-scope text-xl text-center py-2'>{recipe.name}</h1>
                    <p className='my-1'>Difficulty : {recipe.difficulty}</p>
                    <div className='overflow-hidden'>
                        <img 
                            className='h-60 transform transition-transform duration-500 ease-in-out hover:scale-110' 
                            src={imgPath} 
                            alt="recipe" 
                        />
                    </div>
                </div>
                </Link>
            </div>
        
    );
};

export default Card;