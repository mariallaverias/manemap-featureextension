import React, { useState } from "react";

const EMPTY_FORM = {
  storeName: "",
  storeAddress: "",
  storeCity: "",
  storeCountry: "",
  storePostalCode: "",
  blackOwned: 0,
  localOwned: 0,
};

function NewStoreForm(props) {
  const [form, setForm] = useState(EMPTY_FORM);

  function handleSubmit(event) {
    event.preventDefault();
    let userId = props.user.ID;
    let newForm = { ...form, userId }; // I include the user ID to update the user as owner and also to include the FK in the stores table
    props.addStoresCb(newForm);
    setForm(EMPTY_FORM);
    alert("New Store Added!");
    // props.changeUserToOwnerCb(user.ID);
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setForm((form) => ({ ...form, [name]: value }));
  }

  return (
    <div>
      {" "}
      <h2>Add a new store to the directory! </h2>
      <form onSubmit={handleSubmit} className="NewProductForm mb-3 ms-5">
        <label className="form-label col-sm-3">
          Store Name
          <input
            name="storeName"
            type="text"
            className="form-control"
            value={form.storeName}
            onChange={handleChange}
            required
          />
        </label>
        <br /> <br />
        <label className="form-label">
          Address:
          <input
            name="storeAddress"
            type="text"
            placeholder="Street Address"
            className="form-control ms-5"
            value={form.storeAddress}
            onChange={handleChange}
            required
          />{" "}
        </label>
        <label className="form-label">
          {" "}
          <input
            name="storeCity"
            type="text"
            placeholder="City"
            className="form-control ms-5"
            value={form.storeCity}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label">
          <input
            name="storeCountry"
            type="text"
            placeholder="Country"
            className="form-control ms-5"
            value={form.storeCountry}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label">
          <input
            name="storePostalCode"
            type="text"
            placeholder="Postal Code"
            className="form-control ms-5"
            value={form.storePostalCode}
            onChange={handleChange}
            required
          />
        </label>
        <br /> <br />
        <label className="form-label col-sm-5">
          Store Image
          <input
            name="storeImage"
            type="text"
            className="form-control"
            value={form.storeImage}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="btn btn-light">
          Add Store
        </button>
      </form>
    </div>
  );
}

export default NewStoreForm;
