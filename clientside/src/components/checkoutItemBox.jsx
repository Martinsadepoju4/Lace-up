import React, { useContext } from "react";
import CSS from "./checkoutItemBox.module.css";
import { CartContext } from "../cartcontext";
import { css } from "@emotion/react";

export default function CheckoutItemBox() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="container">
      {cartItems.map((element, index) => {
        return (
          <div className={CSS.subContainer} key={index}>
            <ul className={CSS.shoeInfo}>
              <li>
                <img className={CSS.image} alt="shoe" src={element.img} />
              </li>
              <li className={CSS.info}>
                <h3>{element.name}</h3>
                <p>{element.gender + " "} Shoes . 7</p>
              </li>
            </ul>
            <p className={CSS.price}>{element.price}</p>
          </div>
        );
      })}
      {/* <div className={CSS.subContainer}>
    <ul className={CSS.shoeInfo}>
    <li>
     <img className={CSS.image} alt='shoe' src="https://cdn.shopify.com/s/files/1/0852/0048/products/DV9956-118_1_d04fdcb3-12e4-4006-a091-e8a7a680efca_large.jpg?v=1678813284"/>       
    </li>
    <li className={CSS.info}>
      <h3>New Balance 783</h3>
      <p>Men Shoes . 7</p>      
    </li>
    </ul>
    <p className={CSS.price}>$289</p>
</div> */}
    </div>
  );
}
