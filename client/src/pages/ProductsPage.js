import React, { useState } from "react";
import "./ProductsPage.css";

const EMPTY_FORM = {
  productName: "",
  storeName: "",
  storeCity: "",
  storeCountry: "",
};
function ProductsPage(props) {
  const [form, setForm] = useState(EMPTY_FORM);

  if (!props.products) {
    return <h2>Loading....</h2>;
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.getProductsCb(form);
    setForm(EMPTY_FORM);
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setForm((form) => ({ ...form, [name]: value }));
  }

  return (
    <div className="ProductsPage">
      <h2>Products</h2>{" "}
      <form className="Form" onSubmit={handleSubmit}>
        {" "}
        Looking for something specific? <br />
        <input
          name="productName"
          value={form.productName}
          onChange={handleChange}
          placeholder="product name/keyword"
        ></input>{" "}
        <input
          name="storeName"
          value={form.storeName}
          onChange={handleChange}
          placeholder="store name (optional)"
        ></input>{" "}
        <input
          name="storeCity"
          value={form.storeCity}
          onChange={handleChange}
          placeholder="city (optional)"
        ></input>{" "}
        <input
          name="storeCountry"
          value={form.storeCountry}
          onChange={handleChange}
          placeholder="country (optional)"
        ></input>{" "}
        <button type="submit" class="btn btn-light">
          Search
        </button>
        <button
          type="button"
          class="btn btn-light"
          onClick={props.getAllProductsCb}
        >
          Show All Products
        </button>
      </form>
      <ul className="ProductsList">
        {props.products.map((p) => (
          <li
            className="Product"
            key={p.ID}
            // this should not be storesID
            onClick={(e) => props.showProductCb(p.productsID)}
          >
            <img src={p.productImage} width="200" height="200" alt="" /> <br />
            <h4>{p.productName}</h4> {p.quantity} {p.quantityUnits} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;
