import React, { useState } from "react";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import footerCSS from "./footer.module.css";
import { categories } from "../data/shopdata";
import { Link, useNavigate } from "react-router-dom";
function Footer() {
  const [firstDropdownIcon, updateFirstDropdownicon] = useState(true);
  const [secondDropdownIcon, updateSecondDropdownicon] = useState(true);
  const navigate = useNavigate();

  function dropdown(event) {
    const target = event.target.classList;
    const shopList = document.querySelectorAll(
      ".footer_firstDropdownitem__PFkaB"
    );
    const connectList = document.querySelectorAll(
      ".footer_secondDropdownitem__DHRd4"
    );
    if (Object.values(target).includes("footer_firstDropdown__jR27e")) {
      shopList.forEach((element) =>
        element.classList.toggle(footerCSS["show"])
      );
      updateFirstDropdownicon((prevValue) => {
        if (prevValue === true) {
          return false;
        } else {
          return true;
        }
      });
    } else if (Object.values(target).includes("footer_secondDropdown__sAOVn")) {
      connectList.forEach((element) =>
        element.classList.toggle(footerCSS["show"])
      );
      updateSecondDropdownicon((prevValue) => {
        if (prevValue === true) {
          return false;
        } else {
          return true;
        }
      });
    }
  }

  const toGender = (value) => {
    console.log("to gender runniing");
    navigate("/shop", {
      state: {
        key: "gender",
        value: value,
      },
    });
  };

  return (
    <footer>
      <hr className={footerCSS.footerHr} />
      <ul>
        <li className={footerCSS.firstDropdown} onClick={dropdown}>
            <h5>Shop{" "}</h5>
          <span className={footerCSS.dropIcon}>
            {firstDropdownIcon ? (
              <KeyboardArrowDownRoundedIcon
                className={footerCSS.firstDropdown}
              />
            ) : (
              <KeyboardArrowUpRoundedIcon className={footerCSS.firstDropdown} />
            )}
          </span>
        </li>
        {categories.map((element, index) => (
          <li
            onClick={() => toGender(element.name)}
            className={footerCSS.firstDropdownitem}
            key={index}
          >
            {element.name}
          </li>
        ))}
      </ul>
      <hr className={footerCSS.footerHr} />
      <ul>
        <li className={footerCSS.secondDropdown} onClick={dropdown}>
          <h5>Connect{" "}</h5>
          <span className={footerCSS.dropIcon}>
            {secondDropdownIcon ? (
              <KeyboardArrowDownRoundedIcon
                className={footerCSS.secondDropdown}
              />
            ) : (
              <KeyboardArrowUpRoundedIcon
                className={footerCSS.secondDropdown}
              />
            )}
          </span>
        </li>
        <li className={footerCSS.secondDropdownitem}>
          <Link to="">Linkedin</Link>{" "}
        </li>
        <li className={footerCSS.secondDropdownitem}>
          <Link to="https://web.facebook.com/matins.adepoju.5">Facebook</Link>
        </li>
        <li className={footerCSS.secondDropdownitem}>
          <Link to="https://twitter.com/MartinsAdepoju4">Twitter</Link>
        </li>
        <li className={footerCSS.secondDropdownitem}>
          <Link to="https://www.instagram.com/martjns4/">Instagram</Link>
        </li>
      </ul>
      <hr className={footerCSS.footerHr} />
      <ul>
        <li><h5>Connect{" "}</h5></li> 
        <li>martinsadepoju4@gmail.com</li>
        <li>
          <h2 className={footerCSS.logo}>
            [LACE<span>UP]</span>
          </h2>
        </li>
      </ul>
      <ul className={footerCSS.stayInTouch}>
        <li><h5>Stay In Touch</h5></li>
        <li>
          <form>
            <input
              className={footerCSS.footerInput}
              type="email"
              placeholder="email address"
            />
            <button type="submit">
              <TrendingFlatIcon />
            </button>
          </form>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
