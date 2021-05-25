import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { detailsProduct } from "../actions/productActions";
import { useState } from "react";

function ProductScreen(props) {
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      <div>
        <Link to="/" className="back-to-result">
          Back to Homepage
        </Link>
      </div>
      {loading ? (
        <div>LOADING...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt={product.name}></img>
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>

              <li>
                {product.rating} Stars ({product.reviewNum} reviews)
              </li>
              <li>
                Price:<b>${product.price}</b>
              </li>
              <li>
                <p>Product Description: {product.description}</p>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>Price ${product.price}</li>
              <li>
                Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </li>
              <li>
                QTY
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button onClick={handleAddToCart}>Add to Cart</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
