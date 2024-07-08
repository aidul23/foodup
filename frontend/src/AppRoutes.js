import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import FoodPage from "./pages/Food/FoodPage";
import Cart from "./pages/Cart/Cart";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import Payment from "./pages/Payment/Payment";
import OrderTrackPage from "./pages/OrderTrack/OrderTrackPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Orders from "./pages/Orders/Orders";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/search/:searchTerm" element={<Home />}></Route>
      <Route path="/tag/:tag" element={<Home />}></Route>
      <Route path="/food/:id" element={<FoodPage />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <CheckoutPage />
          </AuthRoute>
        }
      ></Route>
      <Route
        path="/payment"
        element={
          <AuthRoute>
            <Payment />
          </AuthRoute>
        }
      ></Route>
      <Route
        path="/track/:orderId"
        element={
          <AuthRoute>
            <OrderTrackPage />
          </AuthRoute>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      ></Route>
      <Route
        path="/orders/:filter?"
        element={
          <AuthRoute>
            <Orders />
          </AuthRoute>
        }
      ></Route>
    </Routes>
  );
}
