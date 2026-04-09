import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";

function Navbar() {
  const { role, isLoggedIn, logout } = useContext(RoleContext);

  return (
    <nav>
      <Link to="/">Home</Link>

      {isLoggedIn && role === "visitor" && (
        <>
          <Link to="/gallery">Gallery</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">My Orders</Link>
        </>
      )}

      {isLoggedIn && role === "artist" && (
        <Link to="/artist">Artist Dashboard</Link>
      )}

      {isLoggedIn && role === "curator" && (
        <Link to="/curator">Curator Panel</Link>
      )}

      {isLoggedIn && role === "admin" && (
        <Link to="/admin">Admin Panel</Link>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}

      {isLoggedIn && (
        <button onClick={logout} style={{ marginLeft: "20px" }}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;