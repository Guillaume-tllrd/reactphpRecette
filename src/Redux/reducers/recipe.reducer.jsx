import {FETCH_RECIPES, ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, GET_RECIPE_BY_CATEGORY, GET_CAROUSSEL_RECIPE, GET_FOUR_RECIPES_TO_INDEX, GET_BEST_RECIPES_TO_INDEX, GET_SEARCH_RECIPES, GET_COUNTRY_RECIPES, GET_TAG_RECIPES} from "../actions/recipe.actions";

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
        case EDIT_RECIPE:
                return {
                    ...state, // on retourne l'état actuel avant de le modifier 
                    recipes: state.recipes.map((recipe) => 
                        //On compare l'ID de chaque commentaire dans le tableau avec l'ID du commentaire qui a été modifié 
                        recipe.id === action.payload.id 
                        // si l'ID correspond, on fait une copie de l'objet recipe avec toutes ses propriétés actuelles et on remplace celle que l'on veut faire afficher sans refresh la page. si on ne met pas les colones, le update se fera dans la bdd mais pas directement sans refresh
                        ? { ...recipe, name: action.payload.name, ingredients: action.payload.ingredients, description: action.payload.description, tags: action.payload.tags} 
                        : recipe
                    )
                };
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
