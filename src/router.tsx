import { createBrowserRouter, redirect } from "react-router-dom";
import Cookies from "js-cookie";

import Login from "./views/Login";
import BaseLayout from "./views/layouts/BaseLayout";
import Dashboard from "./views/Dashboard";
import Products from "./views/Products";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login apiBaseUrl={apiBaseUrl} />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      const token = Cookies.get("token");

      if (!token) {
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);

export default router;
