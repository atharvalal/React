import axios from "axios";
import type { Dispatch, SetStateAction } from "react";
import { formatMoney } from "../../utils/money";
import type { CartItem, DeliveryOption } from "../../types";

interface DeliveryOptionsProps {
  item: CartItem;
  deliveryOptions: DeliveryOption[];
  selectedDelivery: Record<string, string>;
  setSelectedDelivery: Dispatch<SetStateAction<Record<string, string>>>;
  getDeliveryDate: (ms: number) => string;
  onDeliveryOptionChange?: () => Promise<void>;
}

function DeliveryOptions({
  item,
  deliveryOptions,
  selectedDelivery,
  setSelectedDelivery,
  getDeliveryDate,
  onDeliveryOptionChange,
}: DeliveryOptionsProps) {
  const handleDeliveryChange = async (optionId: string): Promise<void> => {
    // 1. Update local state first
    setSelectedDelivery((prev) => ({
      ...prev,
      [item.productId]: optionId,
    }));

    // 2. Send the selected option to the backend
    try {
      await axios.put(`/api/cart-items/${item.productId}`, {
        deliveryOptionId: optionId,
      });
      if (onDeliveryOptionChange) {
        await onDeliveryOptionChange();
      }
    } catch (error) {
      console.error("Failed to update delivery option:", error);
    }
  };

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
              className="delivery-option-input"
              onChange={() => handleDeliveryChange(option.id)} // ✅ Moved here, passes option.id directly
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
