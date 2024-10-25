import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CategoryPage from "./components/CategoryPage";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import CheckoutForm from './components/CheckoutForm';
import LoginAdmin from './components/LoginAdmin';
import AdminDashboard from './components/AdminDashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './config/Stripe';
import { GlobalProvider } from "./context/GlobalContext";

const Router = () => {
    return (
        <BrowserRouter>
            <GlobalProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/product/:productId" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/checkout"
                        element={
                            <Elements stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        } />
                    <Route path="/admin/login" element={<LoginAdmin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<ProductList />} />
                    <Route path="/admin/products/new" element={<ProductForm />} />
                    <Route path="/admin/products/edit/:id" element={<ProductForm />} />
                </Routes>
            </GlobalProvider>
        </BrowserRouter>
    );
}

export default Router
