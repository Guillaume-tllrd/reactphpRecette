import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipesToFavorites, deleteFavoritesRecipe, fetchFavoritesRecipes } from '../../Redux/actions/favoritesRecipe.actions';

const LikedRecipes = ({ recipe }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const user = useSelector((state) => state.userReducer);
    // on récupères les recettes de notre store , si elles y sont on garde le state true 
    const recipes = useSelector((state) => state.favoritesRecipeReducer.favoritesRecipesByUser);

    // Utilisation du useEffect pour gérer l'état initial du like si la recette est déjà en favoris.
    // avec Array.isArray on vérifie si recipe est bien un tableau car avec some() c'est unasynchrone donc cela mettait un erreur. en rajhoutant cette fonction on confirm bien que recipe est un tableau donc le code peut se jouer. 
    // Ensuite some est une méthode pour Array qui vérifie dans notre cas si la recette en favoris est égal à la recette affiché. si c'est la cas ont laisse le state en true.
    useEffect(() => {
        if (Array.isArray(recipes) && recipes.some((favRecipe) => favRecipe.recipe_id === recipe.id && favRecipe.user_id === user.id)) {
            setLiked(true);
        }
    }, [recipes, recipe.id, user.id]);
    
    

    async function handleFormSubmit(e) {
        // si on ne met pas en asynchrone cela ne va pas attendre de finir et par conséquent les recette ne s'afficheront pas directement dans les fav
        e.preventDefault();

        const favoritesRecipesData = {
            user_id: user.id,
            user_name: user.name,
            recipe_id: recipe.id,
            recipe_name: recipe.name,
            recipe_picture: recipe.picture_1,
            recipe_categorie: recipe.categories,
        };

        if (liked) {
            // Supprimer la recette des favoris
            await dispatch(deleteFavoritesRecipe(recipe.id, user.id));
        } else {
            // Ajouter la recette aux favoris
            await dispatch(addRecipesToFavorites(favoritesRecipesData));
        }

        // on doit refecth les favoris après une modif pour que ça s'affiche bien sans refresh
        dispatch(fetchFavoritesRecipes(user.id));

        // Inverser l'état du like
        setLiked(!liked);
    }

    return (
        <div className="relative mx-2 md:mx-3 lg:mx-5 xl:mx-7 2xl:mx-9">
            <form onSubmit={handleFormSubmit}>
                {user && user.id ? (
                    <button type="submit">
                        {liked ? (
                            <Heart className='stroke-current text-red-600 fill-red-500 hover:text-black hover:fill-white' />
                        ) : (
                            <Heart className='fill-white hover:fill-red-600 hover:text-red-600' />
                        )}
                    </button>
                ) : (
                    <div
                        onMouseEnter={() => setShowMessage(true)}
                        onMouseLeave={() => setShowMessage(false)}
                        className="relative"
                    >
                        <Heart className='fill-white hover:text-gray-500 cursor-pointer' />
                        {showMessage && (
                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 p-2 bg-orange-500 text-white text-xs rounded shadow-lg">
                                Please log in to add this recipe to your favorites
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default LikedRecipes;
