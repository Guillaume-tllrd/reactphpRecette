import { ADD_ARTICLE, GET_ARTICLES, GET_ARTICLES_TO_INDEX, GET_TAG_ARTICLES } from "../actions/article.actions";

const initialState = {
    articles : [],
    articlesToIndex: [],
    tagArticle : []
};

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLES:
            return action.payload;
        case GET_ARTICLES_TO_INDEX:
            return {
                ...state,
                articlesToIndex: action.payload,
            }
        case ADD_ARTICLE:
            return {
                ...state, // Conserver l'état précédent
                recipes: [...state.articles, action.payload], // destructure pour ajouter les nouvelles recette au tableau
            };
            case GET_TAG_ARTICLES:
            return {
                ...state,
                tagArticle: action.payload
            };
        default:
            return state;
    }
}