import "../src/App.css";
import HomeScreen from "./components/HomeScreen";
import ProductScreen from "./components/ProductScreen";
import { BrowserRouter, Route, Link } from "react-router-dom";
import React from "react";
import CartScreen from "./components/CartScreen";
import SignInScreen from "./components/SignIn";
import { useSelector } from "react-redux";
import RegisterScreen from "./components/RegisterScreen";
import AddProductScreen from "./components/AddProductScreen"

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <>
      <BrowserRouter>
        <div className="grid-container">
          <header className="header">
            <div className="brand">
              <button onClick={openMenu} className="hamburger">
                &#9776;
              </button>
              <Link to="/">Amazona</Link>
            </div>
            <div className="header-links">
              <Link to="/cart/:id">Cart</Link>
              {userInfo ? (
                <Link to="/profile">{userInfo.name}</Link>
              ) : (
                <Link to="/signin">Signin</Link>
              )}
            </div>
          </header>
          <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close" onClick={closeMenu}>
              x
            </button>
            <ul>
              <li>
                <a href="index.html">Pants</a>
              </li>
              <li>
                <a href="index.html">Shirts</a>
              </li>
            </ul>
          </aside>
          <main className="main">
            <div className="content">
              <Route path="/addproduct" component={AddProductScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/signin" component={SignInScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/" exact={true} component={HomeScreen} />
            </div>
          </main>
          <footer className="footer">All rights reserved</footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
