import React from "react";
import { useNavigate } from "react-router-dom";
import BrandcardCSS from "./brandcard.module.css";
import { motion } from "framer-motion";

export default function Brandcard(props) {
  const navigate = useNavigate();

  const tobrand = (value) => {
    navigate("/shop", {
      state: {
        key: "vendor",
        value: value,
      },
    });
  };

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 1 }}
      onClick={() => tobrand(props.name)}
      className={BrandcardCSS.brandcard}
    >
      <img src={props.src} alt="brand"></img>
      <div className={BrandcardCSS.text}>
        <h3>{props.name}</h3>
        <p>Delivery within 24 hours</p>
      </div>
    </motion.div>
  );
}
