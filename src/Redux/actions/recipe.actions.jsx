import axios from "axios";

export const ADD_RECIPE = "ADD_RECIPE";
export const GET_RECIPE_BY_CATEGORY = 'GET_RECIPE_BY_CATEGORY';
export const GET_CAROUSSEL_RECIPE = 'GET_CAROUSSEL_RECIPE';
export const GET_FOUR_RECIPES_TO_INDEX = 'GET_FOUR_RECIPES_TO_INDEX';
export const GET_BEST_RECIPES_TO_INDEX = 'GET_BEST_RECIPES_TO_INDEX';
export const GET_SEARCH_RECIPES = 'GET_SEARCH_RECIPES';
export const GET_COUNTRY_RECIPES = 'GET_COUNTRY_RECIPES';
export const GET_TAG_RECIPES = 'GGET_TAG_RECIPES';

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

export const getFourRecipesToIndex = () => {
    return (dispatch) => {
        axios.get('http://localhost:8005/recipes.php?indexLimit=4')
        .then((res) => {
            dispatch({ type: GET_FOUR_RECIPES_TO_INDEX, payload: res.data})
        })
    }
}

export const getBestRecipesIndex = () => {
    return (dispatch) => {
        axios.get('http://localhost:8005/recipes.php?top=true')
        .then((res) => {
            dispatch({ type: GET_BEST_RECIPES_TO_INDEX, payload: res.data})
        })
    }
}

export const getSearchRecipes = (searchRecipe) => {
    return (dispatch) => {
        axios.get(`http://localhost:8005/recipes.php?search=${searchRecipe}`)
        .then((res) => {
            dispatch({type: GET_SEARCH_RECIPES, payload: res.data})
        })
    }
}

export const getCountryRecipe = (country) => {
    return (dispatch) => {
        axios.get(`http://localhost:8005/recipes.php?country=${country}`)
        .then((res) => {
            dispatch({type: GET_COUNTRY_RECIPES, payload: res.data})
        })
    }
}
export const getTagRecipe = (tag) => {
    return (dispatch) => {
        axios.get(`http://localhost:8005/recipes.php?tag=${tag}`)
        .then((res) => {
            dispatch({type: GET_TAG_RECIPES, payload: res.data})
        })
    }
}