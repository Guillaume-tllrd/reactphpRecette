import { ADD_RECIPE, GET_RECIPE_BY_CATEGORY} from "../actions/recipe.actions";

const initialState = {
    recipes: [],
    recipesByCategory: [] // Initialisez un tableau pour les recettes
};

export default function recipeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPE_BY_CATEGORY:
            return {
                ...state,
                recipesByCategory: action.payload
            };
        case ADD_RECIPE:
            return {
                ...state, // Conserver l'état précédent
                recipes: [...state.recipes, action.payload], // destructure pour ajouter les nouvelles recette au tableau
            };
        default:
            return state;
    }
}
