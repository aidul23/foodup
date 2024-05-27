import React from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import Clock from "../Clock/Clock";

export default function Header() {
  const user = {
    name: "Aidul",
  };

  const cart = {
    totalCount: 10,
  };

  const logout = () => {};

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          FoodUp
        </Link>
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard">{user.name}</Link>

                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/order">Order</Link>
                  <a onClick={logout}>Logout</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}

            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && <span className={classes.cart_count}>{cart.totalCount}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
