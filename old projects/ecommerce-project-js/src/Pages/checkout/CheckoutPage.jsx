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

  const loadPaymentSummary = async () => {
    const response = await axios.get("/api/payment-summary");
    setPaymentSummary(response.data);
  };

  useEffect(() => {
    document.title = "Checkout Page";
    const fetchCheckoutData = async () => {
      const [deliveryResponse, paymentResponse] = await Promise.all([
        axios.get("/api/delivery-options?expand=estimatedDeliveryTime"),
        axios.get("/api/payment-summary"),
      ]);
      setDeliveryOptions(deliveryResponse.data);
      setPaymentSummary(paymentResponse.data);
    };
    fetchCheckoutData();
  }, [cart]);

  useEffect(() => {
    setSelectedDelivery(
      Object.fromEntries(cart.map((item) => [item.productId, item.deliveryOptionId])),
    );
  }, [cart]);

  const getDeliveryDate = (ms) =>
    dayjs(ms).format("dddd, MMMM D");

  const handleDeliveryOptionChange = async () => {
    await loadPaymentSummary();
  };

  return (
    <>
      <CheckoutHeader paymentSummary={paymentSummary} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            selectedDelivery={selectedDelivery}
            setSelectedDelivery={setSelectedDelivery}
            getDeliveryDate={getDeliveryDate}
            onDeliveryOptionChange={handleDeliveryOptionChange}
          />
          <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
