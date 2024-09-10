import { useSelector } from 'react-redux';
import FavRecipePost from './FavRecipePost';

const FavoritesRecipes = () => {
    const favoritesRecipe = useSelector((state) => state.favoritesRecipeReducer.favoritesRecipesByUser);
    const user = useSelector((state) => state.userReducer);
    
    return (
        <div className='bg-amber-100 '>
            <h1 className='font-scope text-2xl text-center p-6'>My Favorite Recipes</h1>

            <div className='min-h-[500px] '>
                {user && user.id ? (
                    favoritesRecipe && favoritesRecipe.length > 0 ? (
                        <ul className='flex flex-wrap gap-12 max-w-[1200px] mx-auto'>
                            {favoritesRecipe.map((recipe) => (
                                <FavRecipePost recipe={recipe} key={recipe.id} />
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center">You haven't selected a recipe yet.</p>
                    )
                ) : (
                    <p className="text-center">You need to log in to see your favorite recipes.</p>
                )}
            </div>
        </div>
    );
};

export default FavoritesRecipes;
