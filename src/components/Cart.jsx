import { useCart } from "./CartContext";
import NavBar from "./NavBar";

const Cart = () => {
    const { cartItems, increaseQuantity, decreaseQuantity } = useCart();

    const getTotalPriceForItem = (item) => {
        return item.price * item.quantity;
    };

    return (
        <>
            <NavBar />
            <section className="container mx-52 px-4 py-8 mt-20">
                <h1 className='mb-4'>Votre Panier</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden text-center p-4 relative">
                                <img src={item.image} alt={item.title} className="w-full object-contain mt-4 px-4" />
                                <h2 className="text-lg font-semibold text-black min-h-20">{item.title}</h2>
                                <p className='text-black'>{item.description}</p>
                                <div className="p-4 bottom-0">
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-gray-900 font-bold">{getTotalPriceForItem(item)} €</span>
                                        <div className="flex items-center bottom-0 left-0">
                                            <button onClick={() => decreaseQuantity(item.id)} className="text-black bg-white border-1 border-black font-semibold">-</button>
                                            <span className="text-gray-900 font-bold mx-4">{item.quantity}</span>
                                            <button onClick={() => increaseQuantity(item.id)} className="text-black bg-white border-1 border-black font-semibold">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Aucun article dans le panier</div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Cart;
