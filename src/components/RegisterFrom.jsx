import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterFrom = () => {
    const [firstname, setFirstname] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Pour gérer les erreurs de l'API
    const [success, setSuccess] = useState(null); // Pour gérer les succès de l'API

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
            setFirstname("");
            setName("");
            setUsername("");
            setEmail("");
            setPassword("")
          }
        } catch (error) {
          setError('Une erreur est survenue lors de l\'inscription');
          setSuccess(null);
        }
    }
    return (
        <div className="flex items-center justify-center bg-amber-100">
        <div className="bg-white p-10 my-16 rounded-lg shadow-lg">
          <h2 className="text-2xl text-center font-scope font-bold mb-6">Register</h2>
          <form className="min-w-72 " onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Firstname</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
            <div className="my-4 text-center"><Link className='hover:underline text-blue-500' to="/login">Back to log in</Link></div>
            <button className="w-full bg-rose-500 text-white p-2 rounded-md hover:bg-rose-600" type="submit">
              Sign up
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </div>
      </div>
    );
};

export default RegisterFrom;