import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Local from "./helpers/Local";
import Api from "./helpers/Api";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import StoresPage from "./pages/StoresPage";
import ShowProduct from "./pages/ShowProduct";
import ShowStore from "./pages/ShowStore";
import NewProductForm from "./pages/NewProductForm";
import NewStoreForm from "./pages/NewStoreForm";
import LoginView from "./pages/LoginView";
import ProfileView from "./pages/ProfileView";
import RegisterView from "./pages/RegisterView";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [products, setProducts] = useState([]); // USESTATE 1
  const [stores, setStores] = useState([]); // USESTATE 2
  const [productProfile, setProductProfile] = useState({}); //USESTATE 3
  const [storeProfile, setStoreProfile] = useState({}); //USESTATE 4
  const [loginErrorMsg, setLoginErrorMsg] = useState(""); //USESTATE 5
  const [user, setUser] = useState(Local.getUser()); //USESTATE 6
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
    getStores();
  }, []);

  // get stores function
  async function getStores() {
    let options = {
      method: "GET",
    };
    try {
      let response = await fetch("/stores", options);
      if (response.ok) {
        let data = await response.json();
        data && setStores(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  // get store by id function
  async function showStore(id) {
    try {
      let response = await fetch(`/stores/${id}`);
      if (response.ok) {
        let data = await response.json();
        setStoreProfile(data);
        navigate(`/stores/${id}`);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  // add stores
  async function addStores(newStore) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStore),
    };

    try {
      let response = await fetch("/stores", options);
      if (response.ok) {
        let data = await response.json();
        setUser(data.user);
        setStores(data.stores);
        navigate(`/users/${data.user.ID}`);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }
  // get products function (includes search query stuff)
  async function getProducts(filters) {
    let fetchString = "/products";
    //**********/ORIGINAL QUERY CODE
    // // if ANY query exists
    // if (filters) {
    //   //   // separate them into for example productName and 'gel'
    //   let filter = Object.keys(filters)
    //     //     // then filter through the fields that actually have a query
    //     .filter((q) => filters[q].length > 0)
    //     //     // go through each one of them and replace any spaces with a +, for the url
    //     .map((e) => `${e}=${filters[e].replace(" ", "+")}`)

    //     //     // join it with an &, also for the url
    //     .join("&");
    //   console.log(filter);
    //   //   // then finally, add it onto the url
    //   fetchString += `?${filter}`;
    //   //   console.log(fetchString);
    // }

    //**** SOLVED ISSUES IN ORIGINAL QUERY CODE
    // if ANY query exists
    if (filters) {
      //  separate them into for example productName and 'gel'
      let filter = Object.keys(filters)
        // then filter through the fields that actually have a query
        .filter((q) => q.length > 0)
        // go through each one of them and replace any spaces with a +, for the url
        // the replace method only works on strings, so check if the value is a string.
        .map((e) =>
          typeof filters[e] === "string"
            ? `${e}=${filters[e].replace(" ", "+")}`
            : `${e}=${filters[e]}`
        )
        // join it with an &, also for the url
        .join("&");
      // then finally, add it onto the url
      fetchString += `?${filter}`;
      // console.log(fetchString);
    }

    let options = {
      method: "GET",
    };
    try {
      let response = await fetch(fetchString, options);
      if (response.ok) {
        let data = await response.json();
        setProducts(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  // get ALL products (only used this for the 'show all products' button on the product page)
  async function getAllProducts() {
    let options = {
      method: "GET",
    };
    try {
      let response = await fetch("/products", options);
      if (response && response.ok) {
        let data = await response.json();
        data && setProducts(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  // get products by id function
  async function showProduct(id) {
    console.log(id);
    try {
      let response = await fetch(`/products/${id}`);
      if (response.ok) {
        let data = await response.json();
        setProductProfile(data);
        navigate(`/products/${id}`);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  // add products
  async function addProducts(newProduct) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    };

    try {
      let response = await fetch("/products", options);
      if (response.ok) {
        let data = await response.json();
        setProducts(data);
        navigate(`/users/${user.ID}`);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  //delete products
  async function deleteProduct(product) {
    let options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    console.log(options.body);

    try {
      let response = await fetch("/products", options);
      if (response.ok) {
        // let data = await response.json();
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  // add new user to database

  async function addNewUser(newUser) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    try {
      let response = await fetch("/register", options);
      if (response.ok) {
        let data = await response.json();
        // setStores(data);
        console.log(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  // redirect to product (for the 'products seen at this store' part to be clickable)
  function redirectToProduct(id) {
    setProductProfile(null); // remove old product if there was one
    showProduct(id); //fetch product, save in productProfile state, and redirect
  }

  // redirect to store (for the 'stores this product has been found at' part to be clickable)
  function redirectToStore(id) {
    setStoreProfile(null); // remove old store if there was one
    showStore(id); //fetch store, save in storeProfile state, and redirect
  }

  // do Login
  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  //do Logout
  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar user={user} logoutCb={doLogout} stores={stores} />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                products={products}
                stores={stores}
                showProductCb={showProduct}
                showStoreCb={showStore}
              />
            }
          />
          <Route
            path="products"
            element={
              <ProductsPage
                products={products}
                showProductCb={showProduct}
                getProductsCb={getProducts}
                getAllProductsCb={getAllProducts}
              />
            }
          />
          <Route
            path="products/:id"
            element={
              <ShowProduct
                product={productProfile}
                redirectToStoreCb={redirectToStore}
              />
            }
          />

          <Route
            path="/add-products"
            element={
              <PrivateRoute>
                {user && Number(user.owner) === 1 ? (
                  <NewProductForm
                    addProductsCb={addProducts}
                    user={user}
                    stores={stores}
                  />
                ) : null}
              </PrivateRoute>
            }
          />
          <Route
            path="stores"
            element={<StoresPage stores={stores} showStoreCb={showStore} />}
          />
          <Route
            path="stores/:id"
            element={
              <ShowStore
                store={storeProfile}
                redirectToProductCb={redirectToProduct}
              />
            }
          />
          <Route
            path="/add-stores"
            element={
              <PrivateRoute>
                {user &&
                stores.filter((e) => Number(e.FK_userID) === user.ID).length <
                  1 ? (
                  <NewStoreForm addStoresCb={addStores} user={user} />
                ) : null}
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute>
                <ProfileView
                  user={user}
                  stores={stores}
                  deleteProductCb0={(product) => deleteProduct(product)}
                  getProductsCb0={getProducts}
                  products={products}
                />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={
              <LoginView
                loginCb={(u, p) => doLogin(u, p)}
                loginError={loginErrorMsg}
              />
            }
          />
          <Route
            path="/register"
            element={<RegisterView addNewUserCb={addNewUser} />}
          />
        </Routes>
      </div>
      <header className="App-header"></header>
      {/* <HomePage />
      <ProductsPage />
      <StoresPage /> */}
    </div>
  );
}

export default App;
