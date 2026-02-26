import axios from "axios";
import Header from "../../components/Header.jsx";
import "./index.css";
import { useEffect, useState } from "react";
import ProductsGrid from "./productsGrid.jsx";

function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = "Home Page";
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}

export default HomePage;
