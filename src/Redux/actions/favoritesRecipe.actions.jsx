import axios from "axios";

export const ADD_RECIPE_TO_FAVORITES = "ADD_RECIPE_TO_FAVORITES";

export const addRecipesToFavorites = (data) => {
    return (dispatch) => {
        return axios.post("http://localhost:8005/favoriteRecipe.php", data)
        .then((res) => {
            dispatch({type: ADD_RECIPE_TO_FAVORITES, payload: res.data})
        })
        .catch((error) => {
            console.error("Error adding recipe:", error);
            throw error; 
        });
    }
}

