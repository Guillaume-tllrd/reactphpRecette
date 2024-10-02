import axios from "axios";

export const ADD_COMMENT = "ADD_COMMENT";
export const FETCH_COMMENT = "FETCH_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";

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

export const deleteComment = (commentId) => {
    return (dispatch) => {
        return axios.delete('http://localhost:8005/comments.php', {
            data: {
                id: parseInt(commentId, 10),
            }
        })
        .then((res) => {
            dispatch({type: DELETE_COMMENT, payload: commentId}); // il faut utiliser l'id 
        })
        .catch((error) => {
            console.error("Error removing comment", error);
        });
    };
};

export const ediComment= (data) => {
    return (dispatch) => {
        // on doit passer l'id dans l'url pour le put
        return axios.put(`http://localhost:8005/comments.php/${data.id}`, data).then((res) => {
            // ce dispatch va permettre d'envoyer au reducer le type et le payload qui reprend LE PARAM
            dispatch({type: EDIT_COMMENT, payload: data})
            // payload c'est la data que l'on veut recevoir dans le reducer de l'autre côté
        })
    }
}
