import { useGlobalContext } from '../context/GlobalContext';
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    // Utilise le hook personnalisé useCart pour accéder aux fonctions et données du panier
    const { cartItems, increaseQuantity, decreaseQuantity, currency, isDarkMode } = useGlobalContext();
    const navigate = useNavigate();


    const convertPrice = (price) => {
        const rate = currency === 'USD' ? 1.05 : 1;
        return (price * rate).toFixed(2);
    };

    // Fonction pour calculer le prix total d'un article en fonction de sa quantité
    const getTotalPriceForItem = (item) => {
        return parseFloat(convertPrice(item.price * item.quantity));
    };

    // Calcule le total du panier en additionnant le prix total de chaque article
    const cartTotal = cartItems.reduce((total, item) => total + getTotalPriceForItem(item), 0);

    const handlePaymentRedirect = () => {
        navigate('/checkout'); // Assurez-vous que cette route existe dans votre configuration de routage
    };

    return (
        <>
            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
                {/* eslint-disable-next-line no-undef */}
                <NavBar />
                <section className="container mx-auto px-4 py-8 mt-20">
                    <h1 className='mb-10'>Votre Panier</h1>
                    {/* Grille responsive pour afficher les articles du panier */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {cartItems.length > 0 ? (
                            // Affiche chaque article du panier si le panier n'est pas vide
                            cartItems.map((item, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden text-center p-2 relative">
                                    {/* Image de l'article */}
                                    <img src={item.image} alt={item.title} className="w-full h-32 object-contain mt-2" />
                                    {/* Titre de l'article */}
                                    <h2 className="text-sm font-semibold text-black h-12 overflow-hidden">{item.title}</h2>
                                    {/* Description de l'article (tronquée si trop longue) */}
                                    <p className='text-xs text-gray-600 h-16 overflow-hidden'>
                                        {item.description.length > 150
                                            ? item.description.substring(0, 150) + '...'
                                            : item.description}
                                    </p>
                                    <div className="mt-2">
                                        <div className="flex justify-between items-center text-sm">
                                            {/* Prix total de l'article */}
                                            <span className="text-gray-900 font-bold">{getTotalPriceForItem(item)} {currency}</span>
                                            <div className="flex items-center space-x-1">
                                                {/* Bouton pour diminuer la quantité */}
                                                <button
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className="text-black bg-white rounded-xl border border-black w-8 w-8 h-8 flex items-center justify-center hover:border-black">
                                                    <span className="absolute bottom-3 text-xl">−</span>
                                                </button>
                                                {/* Affichage de la quantité */}
                                                <span className="text-gray-900 font-bold mx-3">{item.quantity}</span>
                                                {/* Bouton pour augmenter la quantité */}
                                                <button
                                                    onClick={() => increaseQuantity(item.id)}
                                                    className="relative text-black bg-white rounded-xl border border-black w-8 h-8 flex items-center justify-center hover:border-black">
                                                    <span className="absolute bottom-1 text-xl">+</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Message affiché si le panier est vide
                            <div className="col-span-full">Aucun article dans le panier</div>
                        )}
                    </div>
                    {/* Affichage du total du panier */}
                    {cartItems.length > 0 && (
                        <div className="mt-8 flex justify-end items-center space-x-5">
                            {/* Total du panier */}
                            <div className="inline-block bg-gray-100 rounded p-2 shadow-md">
                                <span className="font-bold text-black">Total: </span>
                                <span className="font-bold text-green-600">{cartTotal.toFixed(2)} {currency}</span>
                            </div>
                            {/* Bouton Payer */}
                            <button
                                onClick={handlePaymentRedirect}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Payer
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default Cart;
