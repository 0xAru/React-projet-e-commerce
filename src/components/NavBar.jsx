import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then((result) => {
        setCategories(result)
      })
  }, [])

  return (
    <nav className="bg-gray-800 py-4">
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
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
