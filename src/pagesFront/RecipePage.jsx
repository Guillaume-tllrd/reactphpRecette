import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { isEmpty } from '../components/Utils';
//Page d'une seule recette
const RecipePage = () => {
    const param = useParams();
    const id = param.id;
    const [recipe , setRecipe] = useState([]); //on met un set loading pour attendre les données
    const [loading, setLoading] = useState(true);
    const img = recipe.picture_1;
    const imgPath= "../../api/" + img;
    useEffect(() => {
        axios.get(`http://localhost:8005/recipes.php?id=${id}`).then((res) => {
            setRecipe(res.data[0]);
            setLoading(false);
        })

    },[])
    console.log(recipe)
    return (
        <div>
            <Header/>
            <div className='bg-amber-100 p-10'>
                <div className='bg-white mx-auto'>
                   {loading ? (<h1>Loading...</h1>) : (
                    <>
                <h1 className='font-scope text-center text-xl'>{recipe.name}</h1>
                <p>Tags : {recipe.tags.split('.')}</p>
                <p>Country: {recipe.country}</p>
                <img src={imgPath} alt="picture recipe" />
                    </>
                )}
                </div>
                  
                
            </div>
            <Footer/>
        </div>
    );
};

export default RecipePage;