import React from "react";
import productCSS from "../css/product.module.css";
export default function Review(props) {
  return (
    <div className={productCSS.reviews}>
      <div className={productCSS.starsAndName}>
      <p className={productCSS.stars}>{props.rating}</p>
      <p>.</p>
        <p className={productCSS.username}>{props.name}</p>
      </div>
      <h2 className={productCSS.header}>{props.header}</h2>
      <p className={productCSS.body}>{props.content}</p>
    </div>
  );
}
