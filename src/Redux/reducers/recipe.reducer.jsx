import { ADD_RECIPE, GET_RECIPE_BY_CATEGORY, GET_CAROUSSEL_RECIPE, GET_FOUR_RECIPES_TO_INDEX, GET_BEST_RECIPES_TO_INDEX} from "../actions/recipe.actions";

const initialState = {
    recipes: [],
    recipesByCategory: [], // Initialisez un tableau pour les recettes
    Caroussel: [],
    recipesToIndex: [],
    bestRecipesToIndex: []
};

export default function recipeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPE_BY_CATEGORY:
            return {
                ...state,
                recipesByCategory: action.payload
            };
        case GET_CAROUSSEL_RECIPE:
            return {
                ...state,
                Caroussel: action.payload
            };
        case GET_FOUR_RECIPES_TO_INDEX:
            return {
                ...state,
                recipesToIndex: action.payload
            };
        case GET_BEST_RECIPES_TO_INDEX:
            return {
                ...state,
                bestRecipesToIndex: action.payload
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
