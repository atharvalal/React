import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
import "./checkout/checkout-header.css";
import "./checkout/checkout.css";
import { formatMoney } from "../utils/money.js";

function CheckoutPage({ cart = [] }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState({});

  useEffect(() => {
    document.title = "Checkout Page";
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then(({ data }) => {
        setDeliveryOptions(data);
        setSelectedDelivery(
          Object.fromEntries(
            cart.map((item) => [item.productId, item.deliveryOptionId]),
          ),
        );
      })
      .catch(console.error);
  }, []);

  const getDeliveryDate = (ms) =>
    dayjs().add(ms, "millisecond").format("dddd, MMMM D");

  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const itemsTotal = cart.reduce(
    (sum, item) =>
      sum + ((item.product?.priceCents || 0) * (item.quantity || 0)) / 100,
    0,
  );
  const shipping = itemCount > 0 ? 4.99 : 0;
  const tax = (itemsTotal + shipping) * 0.1;
  const total = itemsTotal + shipping + tax;

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="/images/logo.png" />
              <img className="mobile-logo" src="/images/mobile-logo.png" />
            </a>
          </div>
          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              {itemCount} items
            </a>
            )
          </div>
          <div className="checkout-header-right-section">
            <img src="/images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.map((item) => {
              const selectedOption = deliveryOptions.find(
                (o) => o.id === selectedDelivery[item.productId],
              );

              return (
                <div key={item.productId} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date:{" "}
                    {selectedOption
                      ? getDeliveryDate(selectedOption.estimatedDeliveryTimeMs)
                      : "—"}
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={
                        item.product?.image
                          ? `/${item.product.image}`
                          : "/images/products/intermediate-composite-basketball.jpg"
                      }
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {item.product?.name || "Product"}
                      </div>
                      <div className="product-price">
                        {formatMoney(item.product?.priceCents || 0)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity:{" "}
                          <span className="quantity-label">
                            {item.quantity}
                          </span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((option) => (
                        <label key={option.id} className="delivery-option">
                          <input
                            type="radio"
                            name={`delivery-option-${item.productId}`}
                            checked={
                              option.id === selectedDelivery[item.productId]
                            }
                            onChange={() =>
                              setSelectedDelivery((prev) => ({
                                ...prev,
                                [item.productId]: option.id,
                              }))
                            }
                            className="delivery-option-input"
                          />
                          <div>
                            <div className="delivery-option-date">
                              {getDeliveryDate(option.estimatedDeliveryTimeMs)}
                            </div>
                            <div className="delivery-option-price">
                              {option.priceCents > 0
                                ? `${formatMoney(option.priceCents)} - Shipping`
                                : "FREE Shipping"}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            <div className="payment-summary-row">
              <div>Items ({itemCount}):</div>
              <div className="payment-summary-money">
                ${itemsTotal.toFixed(2)}
              </div>
            </div>
            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">
                ${shipping.toFixed(2)}
              </div>
            </div>
            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">
                ${(itemsTotal + shipping).toFixed(2)}
              </div>
            </div>
            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">${tax.toFixed(2)}</div>
            </div>
            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">${total.toFixed(2)}</div>
            </div>
            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
