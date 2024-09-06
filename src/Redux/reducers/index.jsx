import { combineReducers } from "redux"
import userReducer from "./user.reducer"
import recipeReducer from "./recipe.reducer";
import articleReducer from "./article.reducer";

const rootReducer = combineReducers ({
    userReducer,
    recipeReducer,
    articleReducer
})

export default rootReducer;