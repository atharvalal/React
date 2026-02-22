import { Routes, Route } from "react-router";
import HomePage from "./Pages/HomePage";
import OrdersPage from "./Pages/OrdersPage";
import CheckoutPage from "./Pages/CheckoutPage";
import TrackingPage from "./Pages/TrackingPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </>
  );
}

export default App;
