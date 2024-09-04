import { ADD_RECIPE } from "../actions/recipe.actions";

const initialState = {
    recipes: [], // Initialisez un tableau pour les recettes
};

export default function recipeReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_RECIPE:
            return {
                recipes: [...state.recipes, action.payload], // destructure pour ajouter les nouvelles recette au tableau
            };
        default:
            return state;
    }
}
