import { React, useContext, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import Cartitem from "./cartitem";
import { CartContext } from "../cartcontext";
import cartCSS from "./cart.module.css";
import Processorderbutton from "./processorderbutton";
import { motion } from "framer-motion";

export default function Cart(props) {
  const { cartItems } = useContext(CartContext);
  const emptyBasketRef = useRef(null);
  const checkoutSummaryRef = useRef(null);
  const subTotalRef = useRef(null);
  const itemHolderRef = useRef(null);
  const [dropdownState, updateDropdownState] = useState(false);

  const cartItemsTotalPrice = cartItems.reduce((accumulator, currentValue) => {
    // console.log(accumulator, currentValue);
    return accumulator + currentValue.price;
  }, 0);

  function showSubTotal() {
    subTotalRef.current.classList.toggle(cartCSS["showSubTotal"]);
    updateDropdownState((prevValue) => (prevValue ? false : true));
    itemHolderRef.current.classList.toggle(cartCSS["changeHeight"]);
    checkoutSummaryRef.current.classList.toggle(
      cartCSS["checkoutSummary_secondHeight"]
    );
  }

  useEffect(() => {
    if (cartItems.length > 0) {
      emptyBasketRef.current.style.display = "none";
      itemHolderRef.current.classList.add(
        cartCSS["itemHolderHeight_secondHeight"]
      );
      checkoutSummaryRef.current.style.display = "block";
    } else {
      emptyBasketRef.current.style.display = "flex";
      itemHolderRef.current.classList.remove(
        cartCSS["itemHolderHeight_secondHeight"]
      );
      checkoutSummaryRef.current.style.display = "none";
    }
  }, [cartItems]);

  return (
    <motion.div
      initial={{ x: "101%" }}
      animate={props.cartSwitch ? { x: 1 } : { x: "101%" }}
      exit={{ x: "-101%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      ref={props.cref}
      className={cartCSS.cart}
    >
      <CloseIcon onClick={props.cancelref} className={cartCSS.cancel} />
      <div className={cartCSS.HeaderAndWishlist}>
        <h3>Basket</h3>
        <button className={cartCSS.wishlist}>Favorite</button>
      </div>
      <hr />
      <div className={cartCSS.main}>
        <div ref={itemHolderRef} className={cartCSS.itemHolder}>
          {cartItems.map((element, index) => {
            return (
              <Cartitem
                name={element.name.toLowerCase()}
                price={element.price}
                src={element.img}
                key={index}
                itemIndex={index}
              />
            );
          })}
          <div className={cartCSS.emptyBasket} ref={emptyBasketRef}>
            <img
              className={cartCSS.emptyBasketImage}
              src="https://static.vecteezy.com/system/resources/previews/008/449/720/non_2x/cute-character-fabric-bag-with-happy-emotions-joyful-face-smile-eyes-arms-and-legs-shopper-with-funny-face-ecological-alternative-to-plastic-bag-flat-illustration-vector.jpg"
              alt="basket"
            />
            <p>Basket is empty</p>
            <p>
              There are no items in your cart yet.
              <br /> Discover all that suits you.
            </p>
            <button className="button"> DISCOVER </button>
          </div>
        </div>
        <div ref={checkoutSummaryRef} className={cartCSS.checkoutSummary}>
          <div ref={subTotalRef} className={cartCSS.subTotal}>
            <div className={cartCSS.subDiv}>
              <p>SUBTOTAL</p>
              <p>{"$" + cartItemsTotalPrice}</p>
            </div>
            <div className={cartCSS.subDiv}>
              <p>SHIPPING COST</p>
              <p className={cartCSS.free}>FREE</p>
            </div>
          </div>
          <div className={cartCSS.total}>
            <h4>TOTAL (including VAT)</h4>
            <h4 className={cartCSS.totalPrice}>
              {"$" + cartItemsTotalPrice}
              {dropdownState ? (
                <KeyboardArrowDownRoundedIcon
                  className={cartCSS.totalIcon}
                  onClick={showSubTotal}
                  fontSize="small"
                />
              ) : (
                <KeyboardArrowUpRoundedIcon
                  className={cartCSS.totalIcon}
                  onClick={showSubTotal}
                  fontSize="small"
                />
              )}
            </h4>
          </div>
          <Processorderbutton />
        </div>
      </div>
    </motion.div>
  );
}
