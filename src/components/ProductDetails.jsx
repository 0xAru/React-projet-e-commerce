import { useLocation, Link } from "react-router-dom";
import NavBar from "./NavBar";

import { useGlobalContext } from "../context/GlobalContext";


const ProductDetails = () => {
  const location = useLocation();
  const product = location.state;
  const { addToCart, currency } = useGlobalContext();

  if (!product) {
    return <div>Loading...</div>;
  }

  const convertPrice = (price) => {
    const rate = currency === 'USD' ? 1.18 : 1;
    return (price * rate).toFixed(2);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-32 w-screen">
        <Link to="/" className="block mb-4 text-blue-600 ml-8">&larr; Retour aux produits</Link>
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative p-6 overflow-hidden">
            <img src={product.image} alt={product.title} className="w-64 h-auto rounded-t-lg mx-auto transition-transform duration-300 ease-in-out transform hover:scale-110" />
          </div>
          <div className="p-6">
            <h1 className="text-xl font-semibold mb-2 text-black">{product.title}</h1>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <div className="p-4">
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-900 font-bold">{convertPrice(product.price)} {currency}</span>
                <button
                  className="add-to-cart bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => addToCart(product)}>
                  <i className="fas fa-shopping-basket"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
