import {FETCH_RECIPES, ADD_RECIPE, DELETE_RECIPE, GET_RECIPE_BY_CATEGORY, GET_CAROUSSEL_RECIPE, GET_FOUR_RECIPES_TO_INDEX, GET_BEST_RECIPES_TO_INDEX, GET_SEARCH_RECIPES, GET_COUNTRY_RECIPES, GET_TAG_RECIPES} from "../actions/recipe.actions";

const initialState = {
    recipes: [],
    recipesByCategory: [], // Initialise un tableau pour les recettes
    Caroussel: [],
    recipesToIndex: [],
    bestRecipesToIndex: [],
    searchRecipe: [],
    countryRecipe: [],
    tagRecipe: []
};

export default function recipeReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_RECIPE:
            return {
                ...state, // Conserver l'état précédent
                recipes: [...state.recipes, action.payload], // destructure pour ajouter les nouvelles recette au tableau
            };
        case FETCH_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(
                    (recipe) => recipe.id !== action.payload)
        }
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
        case GET_SEARCH_RECIPES:
            return {
                ...state,
                searchRecipe: action.payload
            };
        case GET_COUNTRY_RECIPES:
            return {
                ...state,
                countryRecipe: action.payload
            };
        case GET_TAG_RECIPES:
            return {
                ...state,
                tagRecipe: action.payload
            };
        default:
            return state;
    }
}
