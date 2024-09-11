import { ADD_COMMENT } from "../actions/comment.actions";

const initialState = {
    comments : []
}

export default function commentReducer(state = initialState, action) {
    switch(action.type){
        case ADD_COMMENT:
            return {
               ...state,
            comments : [...state.comments, action.payload], 
            }
        default:
            return state;
    }
}