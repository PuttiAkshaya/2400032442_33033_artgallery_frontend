import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { RoleProvider } from "./context/RoleContext";
import { ArtProvider } from "./context/ArtContext";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RoleProvider>
      <ArtProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ArtProvider>
    </RoleProvider>
  </React.StrictMode>
);