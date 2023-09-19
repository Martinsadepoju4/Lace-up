import React from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CSS from "./processorderbutton.module.css";
import { useNavigate } from "react-router-dom";

export default function Processorderbutton() {
  const navigate = useNavigate();

  const toCheckout = () => navigate("/checkout");

  return (
    <button onClick={toCheckout} className="checkoutButton">
      PROCESS ORDER
      <LocalShippingOutlinedIcon className={CSS.icon} />
    </button>
  );
}
