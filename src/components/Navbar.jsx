import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { role, isLoggedIn, logout } = useContext(RoleContext);
  const { cartItems } = useContext(CartContext);

  return (
    <nav>
      <Link to="/">Home</Link>

      {(!isLoggedIn || role?.toLowerCase() === "visitor") && (
        <Link to="/gallery">Gallery</Link>
      )}
      
      {isLoggedIn && role?.toLowerCase() === "visitor" && (
        <>
          <Link to="/cart">
            Cart {cartItems.length > 0 && <span style={{ background: '#ef4444', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem', marginLeft: '5px' }}>{cartItems.length}</span>}
          </Link>
          <Link to="/orders">My Orders</Link>
        </>
      )}

      {isLoggedIn && role?.toLowerCase() === "artist" && (
        <Link to="/artist">Artist Dashboard</Link>
      )}

      {isLoggedIn && role?.toLowerCase() === "curator" && (
        <Link to="/curator">Curator Panel</Link>
      )}

      {isLoggedIn && role?.toLowerCase() === "admin" && (
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