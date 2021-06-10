import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, saveProduct } from "../actions/productActions";

function AddProductScreen(props) {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [numInStock, setNumInStock] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [numInReviews, setNumInReviews] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(listProducts());
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        brand,
        category,
        numInStock,
        image,
        description,
      })
    );
  };

  const openModal = (product) => {
    setModal(true);
    setId(product.id);
    setName(product.name);
    setImage(product.image);
    setPrice(product.price);
    setBrand(product.brand);
    setDescription(product.description)
    setCategory(product.category);
    setNumInStock(product.countInStock);
  };

  return (
    <>
      <div className="content content-margined">
        <div className="product-header">
          <h3>Products</h3>
          <button onClick={() => openModal({})}>Create Product</button>
        </div>
        <div className="product-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.image}</td>
                  <td>{product.countInStock}</td>


                  <td>
                    <button onClick={() => openModal(product)}>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Add Products</h2>
              </li>
              <li>
                {loadingSave && <div>LOADING...</div>}
                {errorSave && <div>{errorSave}</div>}
                {successSave && <div>SUCCESSFULLY ADDED!</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={ name }
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="price"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>{" "}
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="brand"
                  name="brand"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>{" "}
              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="category"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>{" "}
              <li>
                <label htmlFor="numInStock">Number of Items Available</label>
                <input
                  type="numInStock"
                  name="numInStock"
                  id="numInStock"
                  value={numInStock}
                  onChange={(e) => setNumInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description </label>
                <textarea
                  name="description "
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button-primary">
                  {id ? "Update" : "Add Product"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setModal(false);
                  }}
                  type="button"
                  className="button-secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
    </>
  );
}

export default AddProductScreen;
