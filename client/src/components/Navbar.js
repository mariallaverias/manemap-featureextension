import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
  return (
    <nav className="Navbar">
      <div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/stores">Stores</NavLink>
          </li>
          {/*Only show add -produtcs and add stores if user is loged in*/}
          {props.user && props.user.owner === 1 ? (
            <li>
              <NavLink to="/add-products">Add a Product</NavLink>
            </li>
          ) : null}

          {props.user &&
          props.stores.filter(
            (e) => Number(e.FK_userID) === Number(props.user.ID)
          ).length < 1 ? (
            <li>
              <NavLink to="/add-stores">Add a Store</NavLink>
            </li>
          ) : null}
          {/* <li><NavLink to="/bad-route">Bad!</NavLink></li> */}
        </ul>

        {props.user ? (
          <ul>
            <li>
              <NavLink to={`/users/${props.user.ID}`}>
                My Profile ({props.user.username})
              </NavLink>
            </li>
            <li>
              {/* Log out user. Then go to home page. */}
              <NavLink to="/" onClick={props.logoutCb}>
                Logout
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        )}

        {!props.user ? (
          <ul>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
