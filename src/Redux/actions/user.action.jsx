import axios from "axios";
export const GET_SESSION_USER = "GET_SESSION_USER";

export const getSessionUser = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token non trouvé');
        return;
      }
      console.log("Token envoyé dans l'en-tête:", token);  // Vérification du token

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
