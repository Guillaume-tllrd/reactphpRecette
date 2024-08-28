import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/header/Header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8005/api/login.php', {
        username,
        password,
      });
      
      // Stocker le token dans le localStorage
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard';  // Rediriger après la connexion
    } catch (error) {
      setError('Identifiants incorrects');
    }
  };

  return (
    <>
    <Header />
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit">Se connecter</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  </>
  );
};

export default Login;