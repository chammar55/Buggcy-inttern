import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import ProductDetailsPage from "./Pages/ProductDetailsPage/ProductDetailsPage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import Navbar from "./Components/Navbar";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/ProductDetailsPage/:id"
            element={<ProductDetailsPage />}
          />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/CheckoutPage" element={<CheckoutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
