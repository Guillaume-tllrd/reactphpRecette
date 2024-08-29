import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginForm = () => {

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
}
    return (
        <div className="flex items-center justify-center bg-amber-100">
        <div className="bg-white p-10 my-28 rounded-lg shadow-lg">
          <h2 className="text-2xl text-center font-scope font-bold mb-6">Connexion</h2>
          <form className="min-w-72 " onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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