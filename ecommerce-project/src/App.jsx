import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./Pages/Home/HomePage";
import OrdersPage from "./Pages/orders/OrdersPage";
import CheckoutPage from "./Pages/checkout/CheckoutPage";
import TrackingPage from "./Pages/TrackingPage/TrackingPage";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("/api/cart-items?expand=product")
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cartItems} />} />
      <Route path="/orders" element={<OrdersPage cart={cartItems} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cartItems} />} />
      <Route path="/tracking" element={<TrackingPage cart={cartItems} />} />
    </Routes>
  );
}

export default App;
