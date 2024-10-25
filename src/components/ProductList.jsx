// src/components/ProductList.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAdminAuth from '../hooks/useAdminAuth';

const ProductList = () => {
    useAdminAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        // Charger les produits depuis l'API
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                // Grouper les produits par catégorie
                const groupedProducts = data.reduce((acc, product) => {
                    if (!acc[product.category]) {
                        acc[product.category] = [];
                    }
                    acc[product.category].push(product);
                    return acc;
                }, {});
                setCategories(groupedProducts);
            });
    }, []);

    const handleDelete = (id) => {
        // Implémenter la logique de suppression ici
        setProducts(products.filter(product => product.id !== id));

        // Mettre à jour les catégories
        setCategories(prevCategories => {
            const updatedCategories = { ...prevCategories };
            Object.keys(updatedCategories).forEach(category => {
                updatedCategories[category] = updatedCategories[category].filter(product => product.id !== id);
                // Si la catégorie est vide après la suppression, la supprimer
                if (updatedCategories[category].length === 0) {
                    delete updatedCategories[category];
                }
            });
            return updatedCategories;
        });
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-6">Liste des Produits</h1>
            <div className='flex justify-between'>
                <Link to="/admin/products/new" className="bg-green-500 hover:bg-green-600 text-white hover:text-white px-4 py-2 rounded mb-6 inline-block transition duration-300">
                    Ajouter un produit
                </Link>
                <Link to="/" className="bg-white hover:bg-gray-500 text-black hover:text-white px-4 py-2 rounded mb-6">
                    Home
                </Link>
            </div>

            {/* Object.entries() transforme un objet en un tableau de paires [clé, valeur] */}
            {Object.entries(categories).map(([category, categoryProducts]) => (
                // Pour chaque catégorie, on crée un container
                <div key={category} className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">{category}</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryProducts.map(product => (
                            <li key={product.id} className="border border-gray-400 rounded-lg shadow-md p-4 flex flex-col justify-between">
                                <div>
                                    <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-2 bg-white rounded-lg" />
                                    <h3 className="font-medium text-lg mb-2">{product.title}</h3>
                                    <p className="text-white mb-2">{product.price} €</p>
                                </div>
                                <div className="flex justify-center gap-6 mt-4">
                                    <Link to={`/admin/products/edit/${product.id}`} className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white px-3 py-1 rounded">
                                        Éditer
                                    </Link>
                                    <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded hover:border-red-600">
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ProductList;