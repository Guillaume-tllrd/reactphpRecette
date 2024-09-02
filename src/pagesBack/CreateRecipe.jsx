import Sidenav from '../components/back-end/Sidenav';
import RecipeForm from '../components/back-end/RecipeForm';

const CreateRecipe = () => {
    return (
        <div className='flex h-screen '> 
            <Sidenav/>
            <RecipeForm/>   
        </div>
    );
};

export default CreateRecipe;