import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  // États pour gérer les inputs du formulaire
  const [firstname, setFirstname] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Pour gérer les erreurs de l'API
  const [success, setSuccess] = useState(null); // Pour gérer les succès de l'API

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      // Envoie de la requête POST à l'API
      const response = await axios.post('http://localhost:8005/users.php', {
        firstname,
        name,
        username,
        email,
        password,
      });

      // Vérification de la réponse de l'API
      if (response.status === 201) {
        setSuccess('Inscription réussie !');
        setError(null);
      }
    } catch (error) {
      setError('Une erreur est survenue lors de l\'inscription');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
