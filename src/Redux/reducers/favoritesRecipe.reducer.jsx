import { ADD_RECIPE_TO_FAVORITES } from "../actions/favoritesRecipe.actions";

const initialState = {
    favoritesRecipes : []
}

export default function favoritesRecipeReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_RECIPE_TO_FAVORITES:
            return {
                ...state, // Conserver l'état précédent
                favoritesRecipes: [...state.favoritesRecipes, action.payload], // destructure pour ajouter les nouvelles recette au tableau
            };
        default:
            return state;
    }
}