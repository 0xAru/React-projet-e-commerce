import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "./CartContext";

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const { cartItems } = useCart();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then((result) => {
        setCategories(result)
      })
  }, [])

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gray-800 py-4 fixed top-0 left-0 w-full bg-gray-800 p-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-xl font-bold">Ma Boutique en Ligne</Link>
        </div>
        <ul className="flex space-x-4">
          {categories.map(category => (
            <li key={category}>
              <Link to={`/category/${category}`} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">{category}</Link>
            </li>
          ))}
          <li>
            <Link to="/cart">
              <div className="relative">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                  <i className="fas fa-shopping-basket"></i>
                </button>
                {totalQuantity > 0 && (
                  <div className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-white text-xs rounded-full px-2">{totalQuantity}</div>
                )}
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
