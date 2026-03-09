import axios from "axios";
import { formatMoney } from "../../utils/money";
import DeliveryOptions from "./DeliveryOptions";
function OrderSummary({
  cart,
  deliveryOptions,
  selectedDelivery,
  setSelectedDelivery,
  getDeliveryDate,
  onDeliveryOptionChange,
}) {
  return (
    <>
      <div className="order-summary">
        {cart.map((item) => {
          const selectedOption = deliveryOptions.find(
            (o) => o.id === selectedDelivery[item.productId],
          );
        const deleteCartItem = async()=>{
          await axios.delete(`/api/cart-items/${item.productId}`);
          window.location.reload();
        }

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
                      <span className="quantity-label">{item.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <button className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}>
                      Delete
                    </button>
                  </div>
                </div>

                <DeliveryOptions item={item} 
                deliveryOptions={deliveryOptions}
                 selectedDelivery={selectedDelivery} 
                 setSelectedDelivery={setSelectedDelivery} 
                 getDeliveryDate={getDeliveryDate}
                 onDeliveryOptionChange={onDeliveryOptionChange}/>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default OrderSummary;
