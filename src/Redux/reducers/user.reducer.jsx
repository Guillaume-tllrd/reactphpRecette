import { GET_SESSION_LOGOUT, GET_SESSION_USER } from "../actions/user.action";

const initialState = {};

export default function userReducer(state = initialState, action){
    console.log("Action reçue:", action);
    switch(action.type){
        case GET_SESSION_USER:
            return action.payload;
        case GET_SESSION_LOGOUT:
            return initialState;;
        default:
            return state;
    }
}