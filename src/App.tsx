import { createBrowserRouter } from "react-router";

import { Layout } from "./components/Layout";
import { HomePage } from "./pages/home";
import { CartPage } from "./pages/cart";
import { ProductPage } from "./pages/product";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
    ],
  },
]);

export { router };
