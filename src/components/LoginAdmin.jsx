import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Suffisant pour l'exercice 
        if (username === 'admin' && password === 'password') {
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Identifiants incorrects');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div>
                <Link to="/" className="bg-gray-100 text-black hover:text-blue-500 px-4 py-2 rounded">
                    Home
                </Link>
            </div>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100 shadow-lg">
                <h4 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Connexion</h4>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nom d'utilisateur"
                        className="w-full p-3 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        className="w-full p-3 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button type="submit" className="w-full p-3 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    )
    
    
};

export default LoginAdmin;
