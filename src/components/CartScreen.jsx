import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  return (
    <>
      <div className="cart">Cart Screen</div>
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>shopping cart</h3>
          </li>
          {cartItems.length === 0 ? (
            <div>CART IS EMPTY</div>
          ) : (
            cartItems.map((item) => (
              <div>
                <img src={item.image} alt="product" />
                <div className="cart-name">
                  <div>{item.name}</div>
                  <div>
                    QTY
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>
                <div>{item.price}</div>
              </div>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
          <h3>
              Subtotal ( {cartItems.reduce((a, c) => a+c.qty, 0)} items)
              :
          ${cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
          </h3>
          <button className="button-primary" disabled={cartItems.length === 0}>
              Proceed to Checkout
          </button>
        
      </div>
    </>
  );
}

export default CartScreen;