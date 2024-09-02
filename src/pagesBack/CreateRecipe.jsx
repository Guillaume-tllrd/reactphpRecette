import Sidenav from '../components/back-end/Sidenav';
import RecipeForm from '../components/back-end/RecipeForm';

const CreateRecipe = () => {
    return (
        <div className='flex h-screen '>
            <div className='none'>
            <Sidenav/>
            </div>
            <div className='flex-grow  md:overflow-y-auto'>
               <RecipeForm/> 
            </div>
            
        </div>
    );
};

export default CreateRecipe;