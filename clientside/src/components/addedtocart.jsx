import { React, useContext, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CartContext } from "../cartcontext";
import addedCSS from "./addedtocart.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Addedtocart(props) {
  const { cartItems, hasUserOpenedCart, setHasUserOpenedCart } =
    useContext(CartContext);
  const prevCartItems = useRef(cartItems);
  const containerRef = useRef(null);
  const [containerSwitch, setContainerSwitch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let id;
    if (prevCartItems.current !== cartItems) {
      containerRef.current.classList.add(addedCSS["showContainer"]);
      setContainerSwitch(true);
      id = setTimeout(() => {
        containerRef.current.classList.remove(addedCSS["showContainer"]);
        setContainerSwitch(false);
      }, 3000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [cartItems]);

  function closeContainer() {
    containerRef.current.classList.remove(addedCSS["showContainer"]);
    setContainerSwitch(false);
  }
  const toCheckout = () => navigate("/checkout");

  const toBag = () => {
    setHasUserOpenedCart(true);
    console.log("viewbag", hasUserOpenedCart);
  };
  return (
    <div
      initial={{ x: "101%" }}
      animate={containerSwitch ? { x: 1 } : { x: "101%" }}
      exit={{ x: "101%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      ref={containerRef}
      className={addedCSS.container}
    >
      <h3 className={addedCSS.header}>
        ADDED TO BAG <CloseIcon onClick={closeContainer} />
      </h3>
      <div className={addedCSS.main}>
        <img src={props.imageURL} alt="sneaker"></img>
        <div className={addedCSS.mainText}>
          <p>{props.name}</p>
          <p>{props.vendor}</p>
          <p>{"$" + props.price}</p>
        </div>
      </div>
      <div className={addedCSS.buttons}>
        <button onClick={toBag}>View Bag</button>
        <button onClick={toCheckout}>Checkout</button>
      </div>
    </div>
  );
}
