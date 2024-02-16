import { useLocation, Link } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state;

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-6 w-screen h-screen">
      <Link to="/" className="block mb-4 text-blue-600 ml-8">&larr; Retour aux produits</Link>
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative p-6">
          <img src={product.image} alt={product.title} className="w-64 h-auto rounded-t-lg mx-auto" />
        </div>
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-2 text-black">{product.title}</h1>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <div className="p-4">
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-900 font-bold">{product.price} €</span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <i className="fas fa-shopping-basket"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
