import React from "react";
import checkoutCSS from "../css/checkout.module.css";

export default function Contactsummary(props) {
  return (
    <div>
      {props.source === "contact" ? (
        <div className="container">
          <h3>{props.data.firstname + " " + props.data.lastname}</h3>
          <p>{props.data.email}</p>
          <p>{props.data.telephone ? props.data.telephone : "telephone"}</p>
        </div>
      ) : (
        <div className="container">
          <h3>{props.data.firstname + " " + props.data.lastname}</h3>
          <p>{props.data.address ? props.data.address : "address"}</p>
          <p> {props.data.city ? props.data.city : "city"}</p>
          <p> {props.data.postcode ? props.data.postcode : "postcode"}</p>
        </div>
      )}

      {props.source === "delivery" ? (
        <div className={checkoutCSS.deliveryWrapper}>
          <h4>SHIPPING SPEED AND COST</h4>
          <ul className={checkoutCSS.delivery}>
            <li>2-6 Working Days</li>
            <li>FREE</li>
          </ul>
        </div>
      ) : null}

      <button
        onClick={() => props.completionstate(false)}
        className="checkoutButton editButton"
      >
        EDIT
      </button>
    </div>
  );
}
