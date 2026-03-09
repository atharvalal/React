import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
import "./checkout.css";

import CheckoutHeader from "./checkout-header";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import type { CartItem, DeliveryOption, PaymentSummaryData } from "../../types";

interface CheckoutPageProps {
  cart?: CartItem[];
}

function CheckoutPage({ cart = [] }: CheckoutPageProps) {
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<Record<string, string>>({});
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummaryData | null>(null);

  const loadPaymentSummary = async (): Promise<void> => {
    try {
      const response = await axios.get<PaymentSummaryData>("/api/payment-summary");
      setPaymentSummary(response.data);
    } catch (error) {
      console.error("Failed to load payment summary", error);
      setPaymentSummary(null);
    }
  };

  useEffect(() => {
    document.title = "Checkout Page";
    const fetchCheckoutData = async (): Promise<void> => {
      try {
        const [deliveryResponse, paymentResponse] = await Promise.all([
          axios.get<DeliveryOption[]>("/api/delivery-options?expand=estimatedDeliveryTime"),
          axios.get<PaymentSummaryData>("/api/payment-summary"),
        ]);
        setDeliveryOptions(Array.isArray(deliveryResponse.data) ? deliveryResponse.data : []);
        setPaymentSummary(paymentResponse.data);
      } catch (error) {
        console.error("Failed to load checkout data", error);
        setDeliveryOptions([]);
        setPaymentSummary(null);
      }
    };
    void fetchCheckoutData();
  }, [cart]);

  useEffect(() => {
    setSelectedDelivery(
      Object.fromEntries(cart.map((item) => [item.productId, item.deliveryOptionId])),
    );
  }, [cart]);

  const getDeliveryDate = (ms: number): string =>
    dayjs(ms).format("dddd, MMMM D");

  const handleDeliveryOptionChange = async (): Promise<void> => {
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
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
