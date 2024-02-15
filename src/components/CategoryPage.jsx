import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
            .then(response => response.json())
            .then(result => {
                const last5Products = result.slice(-5);
                setProducts(last5Products)})
            .catch(error => console.error("Error fetching products:", error));
    }, [categoryName]);

    return (
        <div className="min-h-screen">
            <NavBar />
            <section className="container mx-52 px-4 py-8 flex justify-start items-start">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                            <p className="text-gray-400">{product.category}</p>
                            <img src={product.image} alt={product.title} className="w-full h-64 object-contain mt-4 px-4" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800 min-h-20">{product.title}</h2>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-gray-900 font-bold">{product.price} €</span>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <i className="fas fa-shopping-basket"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
)};

export default CategoryPage;
