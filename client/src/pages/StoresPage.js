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
            <li className="col-lg-4 d-flex align-items-stretch">
              <div
                className="card col w-100 p-3"
                key={s.ID}
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StoresPage;
