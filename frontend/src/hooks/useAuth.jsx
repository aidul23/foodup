import React, { createContext, useContext, useState } from "react";

import * as userService from "../services/userService.js";

import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const logout = () => {
    if (user) {
      userService.logout();
      setUser(null);
      toast.success("Logout successful");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
