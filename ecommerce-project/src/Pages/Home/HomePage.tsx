import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./index.css";
import ProductsGrid from "./productsGrid";
import type { CartItem, Product } from "../../types";

interface HomePageProps {
  cart: CartItem[];
  loadCart: () => Promise<void>;
}

function HomePage({ cart, loadCart }: HomePageProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    document.title = "Home Page";

    const getHomeData = async (): Promise<void> => {
      try {
        const response = await axios.get<Product[]>("/api/products");
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to load products", error);
        setProducts([]);
      }
    };

    void getHomeData();
  }, []);

  return (
    <>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export default HomePage;
