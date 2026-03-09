import { type ChangeEvent, useState } from "react";
import axios from "axios";
import { formatMoney } from "../../utils/money";
import type { Product as ProductType } from "../../types";

interface ProductProps {
  product: ProductType;
  loadCart: () => Promise<void>;
}

function Product({ product, loadCart }: ProductProps) {
  const [quantity, setQuantity] = useState(1);

  async function addToCart(): Promise<void> {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity,
    });
    await loadCart();
  }

  function handleQuantityChange(event: ChangeEvent<HTMLSelectElement>): void {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  }
  return (
    <>
      <div className="product-container">
        <div className="product-image-container">
          <img className="product-image" src={product.image} />
        </div>

        <div className="product-name limit-text-to-2-lines">{product.name}</div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
          />
          <div className="product-rating-count link-primary">
            {product.rating.count}
          </div>
        </div>

        <div className="product-price">{formatMoney(product.priceCents)}</div>

        <div className="product-quantity-container">
          <select
            value={quantity}
            onChange={handleQuantityChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="product-spacer"></div>

        <div className="added-to-cart">
          <img src="/images/icons/checkmark.png" />
          Added
        </div>

        <button
          className="add-to-cart-button button-primary"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
export default Product;
