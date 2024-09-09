import { combineReducers } from "redux"
import userReducer from "./user.reducer"
import recipeReducer from "./recipe.reducer";
import articleReducer from "./article.reducer";
import favoritesRecipeReducer from "./favoritesRecipe.reducer";

const rootReducer = combineReducers ({
    userReducer,
    recipeReducer,
    articleReducer,
    favoritesRecipeReducer
})

export default rootReducer;