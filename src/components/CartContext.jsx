import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    return useContext(CartContext);
};

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

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
    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
