import { ADD_COMMENT, FETCH_COMMENT, DELETE_COMMENT } from "../actions/comment.actions";

const initialState = {
    comments: [],
    commentsByRecipe: [], // Toujours initialiser en tant que tableau
};

export default function commentReducer(state = initialState, action) {
    switch(action.type){
        case ADD_COMMENT:
            return {
               ...state,
               comments: [...state.comments, action.payload], 
            };
        case FETCH_COMMENT:
            return {
               ...state,
               commentsByRecipe: action.payload, 
            };
            case DELETE_COMMENT:
            return {
                ...state,
                commentsByRecipe: state.commentsByRecipe.filter(
                    (comment) => comment.id !== action.payload)
            }
        default:
            return state;
    }
}

