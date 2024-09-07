import axios from "axios";

export const ADD_RECIPE = "ADD_RECIPE";
export const GET_RECIPE_BY_CATEGORY = 'GET_RECIPE_BY_CATEGORY';
export const GET_CAROUSSEL_RECIPE = 'GET_CAROUSSEL_RECIPE';

export const addRecipe = (data) => {
    return (dispatch) => {
        return axios.post("http://localhost:8005/recipes.php", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            dispatch({ type: ADD_RECIPE, payload: res.data }); 
        })
        .catch((error) => {
            console.error("Error adding recipe:", error);
            throw error; 
        });
    };
};


export const getRecipeByCategory = () => {
    return (dispatch) => {
        axios.get("http://localhost:8005/recipes.php?categoryLimit=true")
        .then(response => {
            const recipes = response.data;
            
            // Filtrer en fonction du nom de la catégorie
            const categories = ["breakfast", "main", "dessert", "appetizer"];
            const recipesByCategory = categories.map(category => {
                return {
                    category: category,
                    recipes: recipes.filter(recipe => recipe.categories === category)
                };
            });

            // Dispatch l'action avec les données transformées
            dispatch({ type: GET_RECIPE_BY_CATEGORY, payload: recipesByCategory });
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
    };
};

export const getCarousselRecipe = () => {
    return (dispatch) => {
        axios.get("http://localhost:8005/recipes.php?background=true")
        .then((res) => {
            dispatch({ type: GET_CAROUSSEL_RECIPE, payload: res.data }); 
        
    })
}
};
