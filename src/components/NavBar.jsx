import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useGlobalContext } from '../context/GlobalContext';

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currency, changeCurrency, isDarkMode, toggleTheme, cartItems } = useGlobalContext();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then((result) => {
        setCategories(result)
      })
  }, [])

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} fixed top-0 left-0 w-full p-6 z-50`}>
      <div className="lg:ml-[13rem] lg:mr-[11rem] flex justify-between items-center gap-3">
        <div>
          <Link to="/" className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold`}>Ma Boutique en Ligne</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none bg-transparent">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Menu pour grands écrans */}
        <ul className="hidden md:flex space-x-4">
          {categories.map(category => (
            <li key={category} className="md:flex md:items-center">
              <Link to={`/category/${category}`} className={`${isDarkMode ? 'text-white' : 'text-black'} md:flex md:align-items-center text-sm font-medium`}>{category}</Link>
            </li>
          ))}
          <li className="md:flex md:items-center">
            <Link to="/admin/login" className={`${isDarkMode ? 'text-white' : 'text-black'} px-3 py-2 rounded-md text-sm font-medium`}>Connexion Admin</Link>
          </li>
          <li className="md:flex md:items-center">
             {/* eslint-disable-next-line no-undef */}
            <button onClick={toggleTheme} className={`${isDarkMode ? 'bg-gray-900 hover:border-gray-900' : 'bg-gray-600 hover:border-gray-600'} py-1 px-2 ml-4 `}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </li>
          <li className="md:flex md:items-center">
            <select
              value={currency}
              onChange={(e) => changeCurrency(e.target.value)}
              className={`${isDarkMode ? 'bg-gray-900 hover:border-gray-600' : 'bg-gray-600 hover:border-gray-400'}p-2 rounded text-white py-1 px-2`}
            >
              <option value="EUR">EUR €</option>
              <option value="USD">USD $</option>
            </select>
          </li>
          <li className="md:flex md:items-center">
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
      {/* Menu déroulant pour petits écrans */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {categories.map(category => (
            <li key={category}>
              <Link
                to={`/category/${category}`}
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {category}
              </Link>
            </li>
          ))}
          <li>
            <select
              value={currency}
              onChange={(e) => changeCurrency(e.target.value)}
              className="md:ml-4 p-2 mb-4 rounded"
            >
              <option value="EUR">EUR €</option>
              <option value="USD">USD $</option>
            </select>
          </li>
          <li>
            <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
              <div className="relative inline-block">
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
