import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";
import MyProducts from "../components/MyProducts";

//code source  Auth Demo  - Jim
function ProfileView(props) {
  const [errorMsg, setErrorMsg] = useState(""); //USESTATE 2
  const [userStore, setUserStore] = useState(null); //USESTATE 3

  let { id } = useParams();
  const user = props.user;

  useEffect(() => {
    getUserStore();
  }, [props.user]);

  function getUserStore() {
    console.log(user);
    console.log(props.stores);
    if (user && user.owner === 1) {
      let x = props.stores.filter((s) => s.FK_userID === user.ID);
      setUserStore(x[0]);
    }
  }
  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <h3 className="border">User Profile</h3>
      ID: {user.ID}
      <br />
      Username: {user.username}
      <br />
      Email: {user.email}
      <br />
      <br />
      {props.user &&
      props.stores &&
      props.stores.filter((e) => Number(e.FK_userID) === Number(props.user.ID))
        .length < 1 ? (
        <button className="btn btn-light">Add your store</button>
      ) : null}
      {userStore ? (
        <div>
          <br />

          <h3 className="border">Store Profile </h3>
          <br />
          <h5> {userStore.storeName}</h5>
          <br />
        </div>
      ) : null}
      {userStore ? (
        <MyProducts
          user={user}
          userStore={userStore}
          deleteProductCb1={(product) => props.deleteProductCb0(product)}
        />
      ) : null}
    </div>
  );
}

export default ProfileView;
