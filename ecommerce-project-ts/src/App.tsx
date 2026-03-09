import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./Pages/Home/HomePage";
import OrdersPage from "./Pages/orders/OrdersPage";
import CheckoutPage from "./Pages/checkout/CheckoutPage";
import TrackingPage from "./Pages/TrackingPage/TrackingPage";
import "./App.css";
import type { CartItem } from "./types";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = async (): Promise<void> => {
    try {
      const response = await axios.get<CartItem[]>("/api/cart-items?expand=product");
      setCartItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to load cart items", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    void loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cartItems} loadCart={loadCart} />} />
      <Route path="/orders" element={<OrdersPage cart={cartItems} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cartItems} />} />
      <Route path="/tracking" element={<TrackingPage cart={cartItems} />} />
    </Routes>
  );
}

export default App;
