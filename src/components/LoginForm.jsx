import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        
        const response = await axios.post('http://localhost:8005/login.php', {
          email,
          password,
      }, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
        console.log('Response Data:', response.data);
        // Assurez-vous que la clé 'token' est bien présente
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          console.log('Token:', response.data.token);
      } else {
          console.error('Token is undefined:', response.data);
      }

        // Rediriger après la connexion
        navigate('/');  // Utiliser useNavigate pour la redirection
      } catch (error) {
        if (error.response && error.response.data) {
          // Afficher le message d'erreur retourné par le serveur
          setError(error.response.data.message || 'Identifiants incorrects');
        } else {
          setError('Erreur de connexion');
        }
      }
    }
    return (
        <div className="flex items-center justify-center bg-amber-100">
        <div className="bg-white p-10 my-28 rounded-lg shadow-lg">
          <h2 className="text-2xl text-center font-scope font-bold mb-6">Connexion</h2>
          <form className="min-w-72 " onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="my-4 text-center"><Link className='hover:underline text-blue-500' to="/register">New here? Create an account</Link></div>
            <button className="w-full bg-rose-500 text-white p-2 rounded-md hover:bg-rose-600" type="submit">
              Login
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </div>
      </div>
    );
};

export default LoginForm;