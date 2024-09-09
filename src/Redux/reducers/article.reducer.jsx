import { ADD_ARTICLE, GET_ARTICLES, GET_ARTICLES_TO_INDEX } from "../actions/article.actions";

const initialState = {
    articles : [],
    articlesToIndex: []
};

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLES:
            return action.payload;
        case GET_ARTICLES_TO_INDEX:
            return {
                ...state,
                articlesToIndex: action.payload
            }
        case ADD_ARTICLE:
            return {
                ...state, // Conserver l'état précédent
                recipes: [...state.articles, action.payload], // destructure pour ajouter les nouvelles recette au tableau
            };
        default:
            return state;
    }
}