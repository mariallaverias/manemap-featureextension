import React from "react";
import "./StoresPage.css";

// this shows all the stores
function StoresPage(props) {
  if (!props.stores) {
    return <h2>Loading....</h2>;
  }
  return (
    <div className="StoresPage">
      <h2>Stores</h2>
      <ul className="StoresList">
        {props.stores.map((s) => (
          <li
            className="Store border "
            key={s.ID}
            style={{ listStyleType: "none" }}
            onClick={(e) => props.showStoreCb(s.ID)}
          >
            <h3>{s.storeName}</h3> <br />
            <img
              src={s.storeImage}
              width="500"
              height="300"
              alt=""
            /> <br /> {s.storeCity}
            {","} {s.storeCountry} {""}
            {s.storePostalCode}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoresPage;
