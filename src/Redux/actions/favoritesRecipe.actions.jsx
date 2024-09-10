import axios from "axios";

export const ADD_RECIPE_TO_FAVORITES = "ADD_RECIPE_TO_FAVORITES";
export const FETCH_RECIPES_BY_USER = "FETCH_RECIPES_BY_USER";
export const DELETE_RECIPE_BY_USER = "DELETE_RECIPE_BY_USER";

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

export const fetchFavoritesRecipes = (userId) => {
    return (dispatch) => {
        return axios.get('http://localhost:8005/favoriteRecipe.php?user_id=${userId}')
        .then((res) => {
            dispatch({type: FETCH_RECIPES_BY_USER, payload: res.data})
        })
        .catch((error) => {
            console.error("Error fetching favorites", error);
        });
    }
}

export const deleteFavoritesRecipe = (recipeId, userId) => {
    return (dispatch) => {
        return axios.delete('http://localhost:8005/favoriteRecipe.php', {
            data: {
                id: parseInt(recipeId, 10),
                user_id: parseInt(userId, 10)
            }
        })
        .then((res) => {
            dispatch({type: DELETE_RECIPE_BY_USER, payload: recipeId}); // il faut utiliser l'id 
        })
        .catch((error) => {
            console.error("Error removing favorites", error);
        });
    };
};
