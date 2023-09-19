import { React, createContext, useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./cartcontext";
import Home from "./home";
import About from "./about";
import Shop from "./shop";
import Login from "./login";
import Product from "./product";
import Checkout from "./checkout";
import Error404 from "./error404";
import Profile from "./profile";
import Contact from "./contact";
// import dotenv from "dotenv";
// dotenv.config();

function App() {
  const queryClient = new QueryClient();
  console.log(process.env.REACT_APP_API_URL);
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/product/:dataSource/:id" element={<Product />}></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </CartProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
