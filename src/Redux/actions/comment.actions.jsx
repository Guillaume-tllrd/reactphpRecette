import axios from "axios";

export const ADD_COMMENT = "ADD_COMMENT";
export const FETCH_COMMENT = "FETCH_COMMENT";

export const addComment = (data) => {
    return (dispatch) => {
        axios.post("http://localhost:8005/comments.php", data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            dispatch({type: ADD_COMMENT, payload: res.data})
        })
        .catch((error) => {
            console.error("Error adding recipe:", error);
            throw error;
        });
    };
};

export const fetchComment = (recipeId) => {
    return (dispatch) => {
        return axios.get(`http://localhost:8005/comments.php?recipe_id=${recipeId}`)
        .then((res) => {
            dispatch({type: FETCH_COMMENT, payload: res.data})
        })
        .catch((error) => {
            console.error("Error fetching comment",error)
        })
    }
}