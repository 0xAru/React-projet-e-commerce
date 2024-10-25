import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useGlobalContext } from '../context/GlobalContext';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart, currency, isDarkMode } = useGlobalContext();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
            .then(response => response.json())
            .then(result => {
                const last5Products = result.slice(-5);
                setProducts(last5Products)
            })
            .catch(error => console.error("Error fetching products:", error));
    }, [categoryName]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const convertPrice = (price) => {
        const rate = currency === 'USD' ? 1.18 : 1;
        return (price * rate).toFixed(2);
    };


    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-800'} min-h-screen`}>
            <NavBar />
            <section className="container md:mx-52 px-4 py-8 pt-32 bg-transparent ">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className={`${isDarkMode ? 'bg-gray-900 placeholder-gray-200 border' : 'bg-gray-300 placeholder-gray-800 border border-gray-800'}  w-1/4 px-2 py-1 rounded-lg focus:outline-none`}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                            <p className="text-gray-400">{product.category}</p>
                            <Link to={`/product/${product.id}`} state={product}>
                                <img src={product.image} alt={product.title} className="w-full h-64 object-contain mt-4 px-4" />
                                <h2 className="text-lg font-semibold text-gray-800 min-h-20">{product.title}</h2>
                            </Link>
                            <div className="p-4">
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-gray-900 font-bold">{convertPrice(product.price)} {currency}</span>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addToCart(product)}>
                                        <i className="fas fa-shopping-basket"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
};

export default CategoryPage;
