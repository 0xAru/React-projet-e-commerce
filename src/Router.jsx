import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import MenClothingCategory from "./components/MenClothingCategory"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/men's clothing" element={<MenClothingCategory/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router