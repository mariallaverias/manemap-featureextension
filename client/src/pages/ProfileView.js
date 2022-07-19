import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";
import MyProducts from "../components/MyProducts";

//code source  Auth Demo  - Jim
function ProfileView(props) {
  const [user, setUser] = useState(null); //USE STATE 1
  const [errorMsg, setErrorMsg] = useState(""); //USESTATE 2
  const [userStore, setUserStore] = useState(null); //USESTATE 3

  let { id } = useParams();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [props.stores]);

  useEffect(() => {
    getUserStore();
  }, [user]);

  async function fetchProfile() {
    let myresponse = await Api.getUser(id);
    if (myresponse.ok) {
      setUser(myresponse.data);
      setErrorMsg("");
    } else {
      setUser(null);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

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

  // function deleteProduct(product) {
  //   setToDelete(product);

  // props.deleteProductCb0(toDelete);
  // }

  return (
    <div>
      <h1>Profile View</h1>
      ID: {user.ID}
      <br />
      Username: {user.username}
      <br />
      Email: {user.email}
      {userStore ? (
        <div>
          <h1>My Store </h1>
          <br />
          <p> {userStore.storeName}</p>
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
