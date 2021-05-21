import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HomeScreen(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      const {data} = await axios.get("/api/products")
      setItems(data)
    };
    fetchData();


  }, []); 

  
  return (
    <ul className="products">
      {items.map((product) => (
        <li key={product._id}>
          <div className="product">
            <Link to={"/product/" + product._id}>
              <img
                className="product-image"
                src={product.image}
                alt="product"
              />
            </Link>
            <div className="product-name">
              <Link to={"/product/" + product._id}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">${product.price}</div>
            <div className="rating">
              {product.rating} ({product.reviewNum} reviews)
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default HomeScreen;
