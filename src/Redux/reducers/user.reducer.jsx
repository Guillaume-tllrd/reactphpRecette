import { GET_SESSION_USER } from "../actions/user.action";

const initialState = {};

export default function userReducer(state = initialState, action){
    console.log("Action reçue:", action);
    switch(action.type){
        case GET_SESSION_USER:
            console.log("Données utilisateur reçues:", action.payload);
            return action.payload;
        default:
            return state;
    }
}