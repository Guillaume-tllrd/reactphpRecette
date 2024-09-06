import { ADD_ARTICLE, GET_ARTICLES } from "../actions/article.actions";

const initialState = {
    articles : [],
};

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLES:
            return action.payload;
            
        case ADD_ARTICLE:
            return {
                ...state, // Conserver l'état précédent
                recipes: [...state.articles, action.payload], // destructure pour ajouter les nouvelles recette au tableau
            };
        default:
            return state;
    }
}