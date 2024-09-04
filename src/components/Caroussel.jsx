import React from 'react';

const Caroussel = () => {
    return (
        <div className=" bg-contain bg-center h-80 md:h-[500px] w-full" 
        style={{ 
          backgroundImage: "url('ravioli.jpg')", 
            // Vous pouvez changer la valeur pour zoomer/dézoomer l'image
        }}>
  
        </div>

    );
};

export default Caroussel;