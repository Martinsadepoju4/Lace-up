import { React, useRef, useState, useContext, useEffect } from "react";
import {
  Link,
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { CartContext } from "../cartcontext";
import Cart from "./cart";
import Addedtocart from "./addedtocart";
import NavCSS from "./nav.module.css";

function Nav(props) {
  const { cartItems, hasUserOpenedSearch } = useContext(CartContext);
  const location = useLocation();
  const itemAddedToCart = cartItems[cartItems.length - 1];
  const [linkColor, updatelinkColor] = useState(NavCSS[props.linkcolor]);
  const navRef = useRef(null);
  const clsRef = useRef(null);
  const hamburger = useRef(null);
  const cancelIcon = useRef(null);
  const menu = useRef(null);
  const cartRef = useRef(null);
  const [cartSwitch, setCartSwitch] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasUserOpenedSearch.current === true) {
      setTimeout(() => openMenu(), 1000);
      hasUserOpenedSearch.current = false;
    }
  }, []);
  const openMenu = () => {
    setIsHamburgerOpen(true);
    hamburger.current.style.display = "none";
    menu.current.style.display = "block";
    menu.current.classList.add(NavCSS["open"]);
    cancelIcon.current.style.display = "list-item";
  };
  const closeMenu = () => {
    setIsHamburgerOpen(false);
    hamburger.current.style.display = "block";
    menu.current.style.display = "none";
    cancelIcon.current.style.display = "none";
  };
  useEffect(() => {
    isHamburgerOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [isHamburgerOpen]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1) {
        if (navRef.current) {
          navRef.current.classList.add(NavCSS.on_scroll);
        }
        updatelinkColor(NavCSS.white);
      } else {
        if (navRef.current) {
          navRef.current.classList.remove(NavCSS.on_scroll);
        }
        updatelinkColor(NavCSS[props.linkcolor]);
      }
    });
  });

  function showCart() {
    setCartSwitch(true);
  }
  function hideCart() {
    setCartSwitch(false);
  }
  const toShop = () => {
    if (location.pathname !== "/shop") {
      hasUserOpenedSearch.current = true;
      navigate("/shop");
    }
  };
  return (
    <div>
      <nav ref={navRef}>
        <h2 className={NavCSS.logo + " " + linkColor}>
          [LACE<span>UP]</span>
        </h2>
        <ul className={NavCSS.navLinks}>
          <li>
            <NavLink className={linkColor} to="/">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink className={linkColor} to="/shop">
              SHOP
            </NavLink>
          </li>
          <li>
            <NavLink className={linkColor} to="/about">
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink className={linkColor} to="/contact">
              CONTACT
            </NavLink>
          </li>
        </ul>
        <ul
          ref={clsRef}
          className={
            NavCSS.cls + " " + linkColor + " " + NavCSS[props.clsWidth]
          }
        >
          <li>
            <ShoppingBagOutlinedIcon onClick={showCart} />
            <span className={NavCSS.cartSpan}>{cartItems.length}</span>
          </li>
          <li>
            <NavLink className={linkColor} to="/login">
              <PersonIcon />
            </NavLink>
          </li>
          <li>
            <input
              onChange={props.searchFunction}
              className={
                NavCSS.searchInput + " " + NavCSS[props.searchInputDisplay]
              }
              type="text"
              name="search"
              placeholder="Search"
            />
            <NavLink to="/shop">
              <SearchIcon
                className={
                  NavCSS.searchIcon +
                  " " +
                  NavCSS[props.searchIconDisplay] +
                  " " +
                  linkColor
                }
              />
            </NavLink>
          </li>
        </ul>
        <div ref={hamburger} className={NavCSS.hamburger} onClick={openMenu}>
          <MenuRoundedIcon fontSize="large" />
        </div>
        <Addedtocart
          name={itemAddedToCart ? itemAddedToCart.name : null}
          vendor={itemAddedToCart ? itemAddedToCart.vendor : null}
          price={itemAddedToCart ? itemAddedToCart.price : null}
          imageURL={itemAddedToCart ? itemAddedToCart.img : null}
        />
        <div ref={menu} className={NavCSS.mobileNav}>
          <div>
            <ul className={NavCSS.mobileCls}>
              <li>
                <PersonIcon />
              </li>
              <li onClick={showCart}>
                <ShoppingBagOutlinedIcon />
                <span className={NavCSS.cartSpan}>{cartItems.length}</span>
              </li>
              <li className={NavCSS.hamburgerSearchLogo}>
                <SearchIcon />
              </li>
              <li
                ref={cancelIcon}
                className={NavCSS.cancel}
                onClick={closeMenu}
              >
                <CloseRoundedIcon fontSize="medium" />
              </li>
            </ul>
          </div>
          <ul className={NavCSS.mobileLinks}>
            <li>
              <Link className={linkColor} to="/">
                HOME
              </Link>
            </li>
            <li>
              <Link className={linkColor} to="/shop">
                SHOP
              </Link>
            </li>
            <li>
              <Link className={linkColor} to="/about">
                ABOUT
              </Link>
            </li>
            <li>
              <Link className={linkColor} to="/contact">
                CONTACT
              </Link>
            </li>
            <li>
              <input
                onClick={toShop}
                onChange={props.searchFunction}
                className={NavCSS.hamburgerSearchInput}
                type="text"
                name="search"
                placeholder="Search"
              />
            </li>
          </ul>
        </div>
      </nav>
      <Cart cref={cartRef} cancelref={hideCart} cartSwitch={cartSwitch} />
    </div>
  );
}

export default Nav;

// ref={menu} className={NavCSS.navUl}
