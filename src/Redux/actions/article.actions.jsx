import axios from "axios";

export const ADD_ARTICLE = "ADD_ARTICLE";
export const GET_ARTICLES = "GET_ARTICLES";
export const GET_TAG_ARTICLES = "GET_TAG_ARTICLES";
export const GET_ARTICLES_TO_INDEX = "GET_ARTICLES_TO_INDEX";

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

export const getArticles = () => {
    return (dispatch) => {
        axios.get("http://localhost:8005/articles.php")
        .then(res => {

            // Dispatch l'action avec les données transformées
            dispatch({ type: GET_ARTICLES, payload: res.data });
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
    };
};

export const getArticlesToIndex = () => {
    return (dispatch) => {
        axios.get("http://localhost:8005/articles.php?indexLimit=3")
        .then((res) => {
            dispatch({type: GET_ARTICLES_TO_INDEX, payload: res.data})
        })
    }
}

export const getTagArticle = (tag) => {
    return (dispatch) => {
        axios.get(`http://localhost:8005/articles.php?tag=${tag}`)
        .then((res) => {
            dispatch({type: GET_TAG_ARTICLES, payload: res.data})
        })
    }
}