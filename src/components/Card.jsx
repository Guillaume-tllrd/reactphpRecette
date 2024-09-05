import React from 'react';

const Card = ({recipe}) => {
   
    const img = recipe.picture_1;
    const imgPath= "../../api/" + img;
    
    return (
        <div className='bg-white w-96 h-[335px] mx-auto mb-5 shadow-lg'>
            <div className='flex flex-col mx-6'>
                 <h1 className='font-scope text-xl text-center py-2'>{recipe.name}</h1>
                 <p className='my-1'>Difficulty : {recipe.difficulty}</p>
            <img className='h-60' src={imgPath} alt="recipe" />
            </div>
           
        </div>
    );
};

export default Card;