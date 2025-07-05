import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "./App.tsx";
import CartProvider from "./contexts/CartProvider";

import "./index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
