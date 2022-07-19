import React, { useState, useEffect } from "react";

const EMPTY_FORM = {
  productName: "",
  price: 0,
  quantity: 0,
  quantityUnits: "",
  price: 0,
  productImage: "",
  brand: "",
};

function NewProductForm(props) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [userStore, setUserStore] = useState(null); //USESTATE 2
  const products = props.products;

  useEffect(() => {
    getUserStore();
  }, []);

  useEffect(() => {
    getUserStore();
  }, [props.user]);

  function handleSubmit(event) {
    event.preventDefault();
    let storeID = userStore.ID;
    let newForm = { ...form, storeID };
    props.addProductsCb(newForm);
    setForm(EMPTY_FORM);
    alert("New Product Added!");
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setForm((form) => ({ ...form, [name]: value }));
  }

  function getUserStore() {
    if (props.user && props.user.owner === 1) {
      let x = props.stores.filter((s) => s.FK_userID === props.user.ID);
      console.log(x);
      setUserStore(x[0]);
    }
  }

  return (
    <div>
      <h2>Add a new product to the directory! </h2>
      <form onSubmit={handleSubmit} className="NewProductForm mb-3 ms-5">
        <label className="form-label col-sm-3 mt-5">
          Product Name
          <input
            name="productName"
            type="text"
            className="form-control"
            value={form.productName}
            onChange={handleChange}
            required
          />
        </label>
        {/* I commented out object being entered because it will vary by store */}
        {/* <label className="form-label">
          Price (€)
          <input
            name="price"
            type="number"
            min="0"
            className="form-control ms-5 m-2"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label> */}
        <label className="form-label col-sm-3 mt-5">
          Product Brand
          <input
            name="brand"
            type="text"
            className="form-control"
            value={form.brand}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label col-sm-2">
          Quantity
          <input
            name="quantity"
            type="number"
            min="0"
            className="form-control ms-5"
            value={form.quantity}
            onChange={handleChange}
            required
          />{" "}
        </label>
        <label className="form-label col-sm-2">
          Units
          <input
            name="quantityUnits"
            type="text"
            placeholder="e.g: ml, g, packs, etc."
            className="form-control ms-5 m-2"
            value={form.quantityUnits}
            onChange={handleChange}
            required
          />{" "}
        </label>
        <label className="form-label col-sm-2">
          Price
          <input
            name="price"
            type="text"
            placeholder="e.g: ml, g, packs, etc."
            className="form-control ms-5 m-2"
            value={form.price}
            onChange={handleChange}
            required
          />{" "}
        </label>
        <br /> <br />
        <label className="form-label col-sm-5">
          Product Image
          <input
            name="productImage"
            type="text"
            className="form-control ms-5"
            value={form.productImage}
            onChange={handleChange}
            required
          />
        </label>
        {/* below, I commented out my attempt to try to put a store dropdown to 
        be able to choose where a product being added is found */}
        {/* <label for="stores">Stores to find this in</label>
        <select name="stores" id="stores">
          <option>Volvo</option>
        </select> */}
        <button type="submit" className="btn btn-light ms-5">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default NewProductForm;
