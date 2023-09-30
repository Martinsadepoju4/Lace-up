import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Errorboundary from "./errorboundary";
import App from "./App";
import ScrollToTop from "./components/scrolltotop";

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<App tab="home" />);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Errorboundary>
        <App />
      </Errorboundary>
    </BrowserRouter>
  </React.StrictMode>
);
