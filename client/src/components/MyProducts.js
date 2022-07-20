import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyProducts(props) {
  const user = props.user;
  const userStore = props.userStore;
  const navigate = useNavigate();

  //  const [myStore, setMyStore]
  // const [storeProducts, setStoreProducts] = useState([]); //USESTATE 4
  // const [toDelete, setToDelete] = useState(); //USESTATE 5

  // useEffect(() => {
  //   getMyProducts();
  // }, [toDelete]);

  // useEffect(() => {
  //   getMyProducts();
  // }, []);

  // //props.getProductsCb(filters);
  // async function getMyProducts() {
  //   let fetchString = `/products/?storeID=${props.userStore.ID}`;

  //   let options = {
  //     method: "GET",
  //   };
  //   try {
  //     let response = await fetch(fetchString, options);
  //     if (response.ok) {
  //       let data = await response.json();
  //       console.log(data);
  //       setStoreProducts(data);
  //     } else {
  //       console.log(`server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`network error: ${err.message}`);
  //   }
  // }

  function redirectToAddProducts(event) {
    event.preventDefault();
    navigate("/add-products");
  }
  // function handleClickDelete(FK_productsID) {
  //   let deletedProduct = { storeID: userStore.ID, productID: FK_productsID };
  //   setToDelete(deletedProduct);
  //   props.deleteProductCb1(deletedProduct);
  //   navigate(`/users/${props.user.ID}`);
  // }

  return (
    <div>
      {/* <h3 className="border">Products in store</h3>
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
            {storeProducts.length > 0 &&
              storeProducts.map((p) => (
                <tr key={p.FK_productsID}>
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
      </div> */}
    </div>
  );
}
export default MyProducts;
