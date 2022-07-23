import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EMPTY_FORM = {
  storeID: null,
};
function MyProducts(props) {
  const user = props.user;
  const userStore = props.userStore;
  const navigate = useNavigate();
  const products = props.products;

  const [filter, SetFilter] = useState({
    storeID: props.userStore.ID,
  });

  useEffect(() => {
    props.getProductsCb1(filter);
  }, []);

  function redirectToAddProducts(event) {
    event.preventDefault();
    navigate("/add-products");
  }
  function handleClickDelete(FK_productsID) {
    let deletedProduct = { storeID: userStore.ID, productID: FK_productsID };

    props.deleteProductCb1(deletedProduct);
    navigate(`/users/${props.user.ID}`);
  }

  return (
    <div>
      <h1>test</h1>
      <h3 className="border">Products in store</h3>
      <div>
        <table className="table table-bordered  padding">
          <thead>
            <tr>
              <th>Product</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Qty</th>
              <th>qty units</th>
              <th>Image</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {props.products &&
              products.length > 0 &&
              products.map((p) => (
                <tr key={p.productsID}>
                  <td>{p.productName}</td>
                  <td>{p.brand}</td>
                  <td>{p.productPrice}€</td>
                  <td>{p.quantity}</td>
                  <td>{p.quantityUnits}</td>
                  <td>
                    <img src={p.productImage} width="50" height="50" />
                  </td>
                  <td>
                    <button className="btn btn-light">Update</button>
                  </td>
                  <td>
                    <button
                      className="btn btn-light"
                      onClick={() => handleClickDelete(p.FK_productsID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className="btn btn-light" onClick={redirectToAddProducts}>
          Add more products
        </button>
      </div>
    </div>
  );
}
export default MyProducts;
