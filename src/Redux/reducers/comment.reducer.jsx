import { ADD_COMMENT, FETCH_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from "../actions/comment.actions";

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
        case EDIT_COMMENT:
            return comments.map((comment) => {
                // pour l'edit tu me map tous les states qu'on appelle post, si l'id correspond à celui qu'on edit (action.payload.id) alors tu me retourn le post sauf content qui change et qui est action.payload.content
                if(comment.id === action.payload.id){
                    return {
                        ...comment, 
                        comment: action.payload.comment
                    }
                } else return comment
                    // ne pas oublier de return les auyres comment au cas ou on ne rentre pas le if
                
                })
        default:
            return state;
    }
}

