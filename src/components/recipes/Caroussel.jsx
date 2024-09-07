import React from 'react';
import {  useSelector } from 'react-redux';

const Caroussel = () => {
    
    const caroussel = useSelector((state) => state.recipeReducer.Caroussel[0])
    console.log(caroussel);
    return (
        <div className=" bg-contain bg-center h-80  w-full" 
        style={{ 
          backgroundImage: "url('ravioli.jpg')", 
            // Vous pouvez changer la valeur pour zoomer/dézoomer l'image
        }}>
  
        </div>

    );
};

export default Caroussel;