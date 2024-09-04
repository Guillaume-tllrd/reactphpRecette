import axios from "axios";

export const ADD_RECIPE = "ADD_RECIPE";

export const addRecipe = (data) => {
    return (dispatch) => {
        return axios.post("http://localhost:8005/recipes.php", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            dispatch({ type: ADD_RECIPE, payload: data }); 
        })
        .catch((error) => {
            console.error("Error adding recipe:", error);
            throw error; 
        });
    };
};
