import React, { createContext, useState, useEffect } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedLogin = localStorage.getItem("isLoggedIn");

    if (savedRole && savedLogin === "true") {
      setRole(savedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (selectedRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
    localStorage.setItem("role", selectedRole);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <RoleContext.Provider value={{ role, isLoggedIn, login, logout }}>
      {children}
    </RoleContext.Provider>
  );
};