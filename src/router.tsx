import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./views/Login";
import Products from "./views/Products";

const router = createBrowserRouter([
    {
        path: "/login",
    },
    {
        path: "/",
        element: <Login />,
        loader: () => {
            if (!sessionStorage.getItem("token")) {
                return redirect("/login")
            }

            return null;
        },
        children: [
            {
                path: "/products",
                element: <Products />,
            }
        ]
    },
]);

export default router