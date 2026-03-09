import Product from "./Product";
import type { Product as ProductType } from "../../types";

interface ProductsGridProps {
  products: ProductType[];
  loadCart: () => Promise<void>;
}

function ProductsGrid({ products, loadCart }: ProductsGridProps) {

  return (
    <>
      <div className="products-grid">
        {products.map((product) => {
          return (
            <Product key={product.id} product={product} loadCart={loadCart} />
          );
        })}
      </div>
    </>
  );
}
export default ProductsGrid;
