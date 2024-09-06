import { ADD_ARTICLE } from "../actions/article.actions";

const initialState = {
    articles : [],
};

export default function recipeReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return {
                ...state, // Conserver l'état précédent
                recipes: [...state.articles, action.payload], // destructure pour ajouter les nouvelles recette au tableau
            };
        default:
            return state;
    }
}