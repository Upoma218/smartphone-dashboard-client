import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Product from "../pages/Products/Product";
import Register from "../pages/Register";
import AddPhoneModal from "../pages/Products/AddPhoneModal";
import SalesHistory from "../pages/orders/SalesHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
            <Home />
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
      },
      {
        path: "order",
        element: (
          <ProtectedRoute>
            <SalesHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/create-product",
        element: (
          <ProtectedRoute>
            <AddPhoneModal />
          </ProtectedRoute>
        ),
      },
      
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
