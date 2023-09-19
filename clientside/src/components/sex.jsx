import React from "react";
import cardCSS from "./brandset.module.css";
import { useNavigate } from "react-router-dom";
export default function Sex(props) {
  const navigate = useNavigate();

  const toGender = (value) => {
    navigate("/shop", {
      state: {
        key: "gender",
        value: value,
      },
    });
  };

  return (
    <div
      onClick={() => toGender(props.name)}
      className={[cardCSS[props.margin], cardCSS.sex_container].join(" ")}
    >
      <img className={cardCSS.sex_image} src={props.src} alt={props.alt} />
      <p className={cardCSS.brandset_name}>{props.name}</p>
    </div>
  );
}
