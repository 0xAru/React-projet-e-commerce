import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { useGlobalContext } from '../context/GlobalContext';

const Home = () => {
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { currency, changeCurrency, isDarkMode, addToCart } = useGlobalContext();



    useEffect(() => {
        const getProducts = async () => {
            let response = await fetch('https://fakestoreapi.com/products')
            let data = await response.json();
            setProducts(data);
            if (response.ok) {
                return setProducts(data);
            }
            setError("une erreur est survenue")
        }
        getProducts()
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const convertPrice = (price) => {
        const rate = currency === 'USD' ? 1.05 : 1;
        return (price * rate).toFixed(2);
    };

    if (error) {
        return <div>Erreur: {error.message} </div>;
    } else {
        return (
            <>
                <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-800'}>
                    <NavBar currency={currency} changeCurrency={changeCurrency} />
                    <section className="container md:mx-52 px-4 py-8 pt-32">
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
                                <div key={product.id}
                                    className="product-card bg-white rounded-lg shadow-md overflow-hidden text-center"
                                    data-testid="product-card">
                                    <p className="text-gray-400">{product.category}</p>
                                    <Link to={`/product/${product.id}`} state={product}>
                                        <img src={product.image} alt={product.title}
                                            className="w-full h-64 object-contain mt-4 px-4" />
                                        <h2 className="text-lg font-semibold text-gray-800 min-h-20">{product.title}</h2>
                                    </Link>
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-gray-900 font-bold">{convertPrice(product.price)} {currency}</span>
                                            <button
                                                className="add-to-cart bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => addToCart({ ...product, price: parseFloat(product.price) })}>
                                                <i className="fas fa-shopping-basket"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </>
        )
    }
}

export default Home;
