import axios from "axios";

export const ADD_ARTICLE = "ADD_ARTICLE";

export const addArticle = (data) => {
    return (dispatch) => {
        return axios.post("http://localhost:8005/articles.php", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            dispatch({ type: ADD_ARTICLE, payload: res.data }); 
        })
        .catch((error) => {
            console.error("Error adding article:", error);
            throw error; 
        });
    };
};