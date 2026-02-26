import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
import "./checkout.css";

import CheckoutHeader from "./checkout-header.jsx";
import OrderSummary from "./OrderSummary.jsx";
import PaymentSummary from "./PaymentSummary.jsx";

function CheckoutPage({ cart = [] }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState({});
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    document.title = "Checkout Page";
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then(({ data }) => {
        setDeliveryOptions(data);
      })
      .catch(console.error);

    axios
      .get("/api/payment-summary")
      .then(({ data }) => {
        setPaymentSummary(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setSelectedDelivery(
      Object.fromEntries(cart.map((item) => [item.productId, item.deliveryOptionId])),
    );
  }, [cart]);

  const getDeliveryDate = (ms) =>
    dayjs(ms).format("dddd, MMMM D");

  return (
    <>
      <CheckoutHeader paymentSummary={paymentSummary} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} selectedDelivery={selectedDelivery} setSelectedDelivery={setSelectedDelivery} getDeliveryDate={getDeliveryDate}/>
          <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
