import React from "react";
import "./StoresPage.css";

// this shows all the stores
function StoresPage(props) {
  if (!props.stores) {
    return <h2>Loading....</h2>;
  }
  return (
    <div className="StoresPage container">
      <h2>Stores</h2>
      <div>
        <ul className="row">
          {props.stores.map((s) => (
            <li key={s.ID} className="col-lg-4 d-flex align-items-stretch">
              <div
                className={
                  s.blackOwned
                    ? "card border-warning col w-100 p-3"
                    : "card col w-100 p-3"
                }
                style={{ listStyleType: "none" }}
                onClick={(e) => props.showStoreCb(s.ID)}
              >
                <h3 className="card-title">{s.storeName}</h3> <br />
                <img
                  className="card-img-top"
                  src={s.storeImage}
                  width="500"
                  height="300"
                  alt=""
                />{" "}
                <br /> {s.storeCity}
                {","} {s.storeCountry} {""}
                {s.storePostalCode}
                {s.blackOwned ? (
                  <p className="card-footer  bg-gradient-warning text-warning border-warning">
                    Black-owned business
                  </p>
                ) : null}
                {s.localOwned ? (
                  <p className="card-footer  bg-gradient-success text-success border-success">
                    Local-owned business
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StoresPage;
