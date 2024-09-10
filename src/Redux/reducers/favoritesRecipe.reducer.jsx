import { ADD_RECIPE_TO_FAVORITES, FETCH_RECIPES_BY_USER, DELETE_RECIPE_BY_USER } from "../actions/favoritesRecipe.actions";

const initialState = {
    favoritesRecipes : [],
    favoritesRecipesByUser: []
}

export default function favoritesRecipeReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_RECIPE_TO_FAVORITES:
            return {
                ...state, // Conserver l'état précédent
                favoritesRecipes: [...state.favoritesRecipes, action.payload], // destructure pour ajouter les nouvelles recette au tableau
            };
        case FETCH_RECIPES_BY_USER:
            return {
                ...state,
                favoritesRecipesByUser: action.payload,
            }
        case DELETE_RECIPE_BY_USER:
            return {
                ...state,
                favoritesRecipesByUser: state.favoritesRecipesByUser.filter(
                    (recipe) => recipe.id !== action.payload)
            }
        default:
            return state;
    }
}

