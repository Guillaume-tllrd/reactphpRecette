import axios from "axios";

export const ADD_COMMENT = "ADD_COMMENT";

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