import axios from "axios";
import Header from "../../components/Header.jsx";
import "./index.css";
import { useEffect, useState } from "react";
import ProductsGrid from "./productsGrid.jsx";

function HomePage({ cart , loadCart}) {
  const [products, setProducts] = useState([]);

  useEffect( () => {
    document.title = "Home Page";
    const getHomeData = async()=> {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    }
    getHomeData();
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
