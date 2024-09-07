import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Category from '../components/recipes/Category';
// page d'une catégorie
const RecipeByCategory = () => {
    const param = useParams()
    // console.log(param.category)
    const category = param.category
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8005/recipes.php?categories=${category}`).then((res) => setRecipes(res.data))
    }, [])

    return (
        <div>
            <Header/>
            <section className='bg-amber-100 pt-5'>
                <Category category={category} recipes={recipes}/>
            </section>
            
            <Footer/>
        </div>
    );
};

export default RecipeByCategory;