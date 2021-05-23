import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomeScreen(props) {

  const productList = useSelector(state => state.productList)
  const {products, loading, error} = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(listProducts())
    };
fetchData()

  }, []); 

  
  return loading ? <div>loading...</div> :
    error ? <div>Error</div>:
    <ul className="products">
      {products.map((product) => (
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
}

export default HomeScreen;
