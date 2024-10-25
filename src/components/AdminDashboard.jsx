import { Link, useNavigate } from 'react-router-dom';
import useAdminAuth from '../hooks/useAdminAuth';

const AdminDashboard = () => {
    useAdminAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        navigate('/');
    };

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <div className="flex justify-between items-center mb-16">
                <h1 className="text-2xl font-bold">Tableau de bord Admin</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white px-2 rounded hover:border-red-700"
                >
                    Déconnexion
                </button>
            </div>
            <div className='flex justify-between'>
                <Link to="/admin/products" className="bg-blue-500 hover:bg-blue-700 hover:text-white text-white py-2 px-4 rounded">
                    Gérer les produits
                </Link>
                <Link to="/" className="bg-white hover:bg-gray-500 text-black hover:text-white px-4 py-2 rounded">
                    Home
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
