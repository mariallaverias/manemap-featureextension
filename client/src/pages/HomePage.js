import React, { useState } from "react";
import "./HomePage.css";

function HomePage(props) {
  if (!props.products || !props.stores) {
    return <h2>Loading....</h2>;
  }
  return (
    <div className="HomeView">
      <div className="circular_image">
        <img src="https://64.media.tumblr.com/696ea4936a2198921e6e20d37c46a2fc/dae72e0549a3185c-0e/s1280x1920/bfa0124b65298344e5ad50232c04344b833aaf66.jpg" />
      </div>
      <h2>Your Global Directory for All Things Beauty Supply!</h2>
      <div className="FeaturedContainer mt-5">
        <h2 className="mt-10">Featured Products</h2>
        <ul className="card-group" style={{ listStyleType: "none" }}>
          {props.products.slice(2, 5).map((p) => (
            <li
              className="FeaturedProducts"
              key={p.ID}
              onClick={(e) => props.showProductCb(p.ID)}
            >
              <img src={p.productImage} width="200" height="200" alt="" />{" "}
              <br />
              <h4>{p.productName}</h4> <br /> {p.quantity} {p.quantityUnits}
            </li>
          ))}
        </ul>
        <div className="border"></div>
        <h2 className="mt-3">Featured Stores</h2>
        <ul className="FeaturedStores" style={{ listStyleType: "none" }}>
          {props.stores.slice(0, 2).map((s) => (
            <li
              className="Store"
              key={s.ID}
              onClick={(e) => props.showStoreCb(s.ID)}
            >
              <img src={s.storeImage} width="500" height="300" alt="" /> <br />{" "}
              <h3>{s.storeName}</h3>
              <br /> {s.storeCity}
              {","} {s.storeCountry} {""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default HomePage;
