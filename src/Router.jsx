import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CategoryPage from "./components/CategoryPage";
import ProductDetails from "./components/ProductDetails";
import { CartProvider } from "./components/CartContext";
import Cart from "./components/Cart";

const Router = () => {
    return (
        <BrowserRouter>
            <CartProvider>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path="/category/:categoryName" element={<CategoryPage/>} />
                    <Route path="/product/:productId" element={<ProductDetails/>} />
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}

export default Router;
