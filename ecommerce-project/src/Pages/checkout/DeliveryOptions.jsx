import { formatMoney } from "../../utils/money";
function DeliveryOptions({item,deliveryOptions,selectedDelivery,setSelectedDelivery,getDeliveryDate}) {
  return (
    <>
      <div className="delivery-options">
        <div className="delivery-options-title">Choose a delivery option:</div>
        {deliveryOptions.map((option) => (
          <label key={option.id} className="delivery-option">
            <input
              type="radio"
              name={`delivery-option-${item.productId}`}
              checked={option.id === selectedDelivery[item.productId]}
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
    </>
  );
}
export default DeliveryOptions;
