import { React, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../cartcontext";
import cardCSS from "./brandset.module.css";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";

function Brandset(props) {
  const { cartItems, saveItems } = useContext(CartContext);
  const navigate = useNavigate();

  function addItem(name, price, src, vendor, gender) {
    const newPrice = Number(price.replace("$", ""));
    const data = [
      ...cartItems,
      {
        name: name,
        price: newPrice,
        img: src,
        vendor: vendor,
        gender: gender,
      },
    ];
    saveItems(data);
  }

  function toProduct() {
    navigate(`/product/${props.dataSource}/${props.id}`);
  }

  function removeUnderscore(n) {
    if (n) {
      return n.replace("_", "");
    } else {
      return;
    }
  }

  return (
    <div
      className={
        props.source === "home"
          ? cardCSS.brandset_home_container
          : cardCSS.brandset_shop_container
      }
    >
      <div className={cardCSS.image_container}>
        <img
          className={cardCSS.brandset_image}
          src={props.src}
          alt={props.alt}
        />
        <LocalMallRoundedIcon
          className={cardCSS.cartIcon}
          onClick={() =>
            addItem(
              props.name,
              props.price,
              props.src,
              props.vendor,
              props.gender
            )
          }
        />
      </div>

      <p onClick={toProduct} className={cardCSS.brandset_name}>
        {props.name}
      </p>
      <div className={cardCSS.P_V}>
        <p>{props.price}</p>
        <p>{removeUnderscore(props.vendor)}</p>
      </div>
    </div>
  );
}

export default Brandset;
