import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  // retrieve cart to localStorage
  const retrieveFromLocalStorage = () => {
    const result = localStorage.getItem("cartData");
    return result ? JSON.parse(result) : [];
  };

  // retrieve user to localStorage
  const retrieveUSerFromLocalStorage = () => {
    const result = localStorage.getItem("user");
    console.log(result);
    return result ? JSON.parse(result) : null;
  };

  const [userLoggedIn, setUserLoggedIn] = useState(
    retrieveUSerFromLocalStorage ? retrieveUSerFromLocalStorage : null
  );

  const [cartItems, setCartItems] = useState(
    retrieveFromLocalStorage ? retrieveFromLocalStorage : []
  );

  const saveItems = (cartItems) => {
    setCartItems(cartItems);
    localStorage.setItem("cartData", JSON.stringify(cartItems));
  };

  const saveUser = (userLoggedIn) => {
    setUserLoggedIn(userLoggedIn);
    localStorage.setItem("user", JSON.stringify(userLoggedIn));
    console.log(localStorage.getItem("user"));
  };

  const value = {
    cartItems,
    saveItems,
    userLoggedIn,
    saveUser,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
