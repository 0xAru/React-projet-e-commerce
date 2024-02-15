import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import CategoryPage from "./components/CategoryPage"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/category/:categoryName" element={<CategoryPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router