import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasketDetails from "../basket";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import ProductDefails from "../pages/Product";
import Products from "../pages/Products";

const Router = () => {


    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDefails/>}/>
                    <Route path="/basket" element={<BasketDetails/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;