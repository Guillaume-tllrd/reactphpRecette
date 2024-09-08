import React from 'react';
import {  useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Caroussel = () => {
    const location = useLocation();
    const caroussel = useSelector((state) => state.recipeReducer.Caroussel[0])
    
    if (!caroussel) {
        return <p>Loading...</p>;
    }

    const basePath = location.pathname.includes(`/recipes/${caroussel.categories}`)
   ? `/recipes/${caroussel.categories}/${caroussel.id}` // Already in category path, only add the ID
   : `/recipes/${caroussel.categories}/${caroussel.id}`;



    console.log(caroussel);
    const img = caroussel.picture_2;
    const imgPath = "../../../api/" + img;

    return (
        <div className='relative'> 
            <img className='max-h-[680px] mx-auto w-full object-cover' src={imgPath} alt="caroussel" />
            <div className='absolute top-16 left-[5%] bg-opacity-50 bg-black px-6 py-4 lg:top-20 '>
                <h1 className='font-scope mb-2 text-lg text-center text-white'>{caroussel.name}</h1>
                <p className='hidden md:block text-white mb-4 md:w-[340px]'>{caroussel.summary}</p>
                <div className="flex justify-center">
                    <Link to={`${basePath}`}className='bg-orange-400 py-2 px-4 rounded-xl hover:bg-orange-500 hover:text-yellow-100'>View recipe</Link>
                </div>
                

            </div>
        </div>
        
        
        // <div className=" bg-contain bg-center h-80 w-full" 
        // style={{ 
        //   backgroundImage: "url('imgPath')", 
        //     // Vous pouvez changer la valeur pour zoomer/dézoomer l'image
        // }}>
  
        // </div>

    );
};

export default Caroussel;