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
                return {
                    ...state, // on retourne l'état actuel avant de le modifier 
                    commentsByRecipe: state.commentsByRecipe.map((comment) => 
                        //On compare l'ID de chaque commentaire dans le tableau avec l'ID du commentaire qui a été modifié 
                        comment.id === action.payload.id 
                        // si l'ID correspond, on fait une copie de l'objet comment avec toutes ses propriétés actuelles et on remplace comment et date
                        ? { ...comment, comment: action.payload.comment, date: action.payload.date } 
                        : comment
                    )
                };
        default:
            return state;
    }
}

