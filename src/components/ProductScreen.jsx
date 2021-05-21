import data from "../data";
import { Link } from "react-router-dom";

function ProductScreen(props) {
  const product = data.products.find((x) => x._id === props.match.params.id);
  return (
    <div>
      <div>
        <Link to="/" className="back-to-result">
          Back to Homepage
        </Link>
      </div>
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
            <li>Status: {product.status}</li>
            <li>
              QTY{" "}
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </li>
            <li>
              <button>Add to Cart</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
