import { createContext, useContext, useState } from "react";

// Création d'un contexte global
const GlobalContext = createContext();

// Hook personnalisé pour utiliser le contexte global
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

// Composant fournisseur du contexte global
// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
    // État pour le panier
    const [cartItems, setCartItems] = useState([]);

    // État pour la devise
    const [currency, setCurrency] = useState('EUR');

    // État pour le thème
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Fonctions pour le panier
    const addToCart = (item) => {
        const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const increaseQuantity = (id) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const decreaseQuantity = (itemId) => {
        const updatedCartItems = [...cartItems];
        const itemIndex = updatedCartItems.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
            if (updatedCartItems[itemIndex].quantity > 1) {
                updatedCartItems[itemIndex].quantity -= 1;
            } else {
                updatedCartItems.splice(itemIndex, 1);
            }
            setCartItems(updatedCartItems);
        }
    };

    // Fonction pour la devise
    const changeCurrency = (newCurrency) => {
        setCurrency(newCurrency);
    };

    // Fonction pour le thème
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Fournit le contexte avec toutes les valeurs et fonctions nécessaires
    return (
        <GlobalContext.Provider value={{
            cartItems,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            currency,
            changeCurrency,
            isDarkMode,
            toggleTheme
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
