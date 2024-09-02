import axios from "axios";

export const GET_SESSION_USER = "GET_SESSION_USER";
export const GET_SESSION_LOGOUT = "GET_SESSION_LOGOUT";


export const getSessionUser = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token non trouvé');
        return;
      }  

      const response = await axios.get('http://localhost:8005/sessionUser.php', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      dispatch({ type: GET_SESSION_USER, payload: response.data });

    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }
  };
};

export const getSessionLogOut = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: GET_SESSION_LOGOUT });
  };
};