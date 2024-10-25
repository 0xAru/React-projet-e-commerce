// src/components/ProductForm.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAdminAuth from '../hooks/useAdminAuth';

const ProductForm = () => {
    useAdminAuth()
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        image: 'https://fakestoreapi.com/img/',
        category: ''
    });

    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data));

        if (isEditMode) {
            // Charger les données du produit si on est en mode édition
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    // Assurez-vous que l'image commence toujours par le bon chemin
                    const imagePath = data.image.startsWith('https://fakestoreapi.com/img/')
                        ? data.image
                        : 'https://fakestoreapi.com/img/' + data.image;
                    setProduct({ ...data, image: imagePath });
                });
        }
    }, [id, isEditMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implémenter la logique de création/mise à jour ici
        const url = isEditMode ? `https://fakestoreapi.com/products/${id}` : 'https://fakestoreapi.com/products';
        const method = isEditMode ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...product,
                price: parseFloat(product.price)
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Réponse de l\'API:', data);
                setMessage(isEditMode ? 'Produit modifié avec succès!' : 'Produit ajouté avec succès!');
                setTimeout(() => {
                    navigate('/admin/products');
                }, 2000);
            })
            .catch(error => {
                setMessage('Une erreur est survenue. Veuillez réessayer.');
                console.error('Erreur:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            // Pour le champ image, on garde le préfixe et on ajoute la valeur entrée
            setProduct(prev => ({
                ...prev,
                [name]: 'https://fakestoreapi.com/img/' + value.replace('https://fakestoreapi.com/img/', '')
            }));
        } else {
            setProduct(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl">
                <h4 className="text-2xl font-bold text-center text-white mb-10">
                    {isEditMode ? 'Modifier un produit' : 'Ajouter un produit'}
                </h4>

                {message && (
                    <div className="bg-blue-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{message}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        placeholder="Titre"
                        className="w-full p-2 mb-6 border rounded"
                        required
                    />
                    <div className="relative mb-6">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Prix"
                            className="w-full p-2 border rounded"
                            required
                        />
                        <span className="absolute right-9 top-2 transform text-white mb-1">€</span>
                    </div>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full p-2 mb-6 border rounded"
                    />
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        placeholder="URL de l'image"
                        className="w-full p-2 mb-6 border rounded"
                    />
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full p-2 mb-6 border rounded"
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                        {isEditMode ? 'Mettre à jour' : 'Créer'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
