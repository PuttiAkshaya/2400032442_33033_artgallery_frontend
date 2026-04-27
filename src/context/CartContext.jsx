import React, { createContext, useState, useEffect } from "react";
import API_BASE_URL from "../apiConfig";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
      if (response.ok) {
        const data = await response.json();
        // The backend returns an array of CartItem objects {id, user, artwork}
        // We only need the artworks for the frontend state
        setCartItems(data.map(item => item.artwork));
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (art) => {
    if (!userId) {
      // Local fallback if guest
      setCartItems((prevItems) => [...prevItems, art]);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: { id: parseInt(userId) },
          artwork: { id: art.id }
        })
      });
      if (response.ok) {
        setCartItems((prevItems) => [...prevItems, art]);
      } else {
        // If DB fails (likely FK error because art not synced), fallback to local state for UX
        console.warn("DB Cart sync failed, falling back to local session.");
        setCartItems((prevItems) => [...prevItems, art]);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setCartItems((prevItems) => [...prevItems, art]);
    }
  };

  const removeFromCart = async (index) => {
    const itemToRemove = cartItems[index];
    if (!userId || !itemToRemove.id) {
      setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}/${itemToRemove.id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    if (!userId) {
      setCartItems([]);
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/cart/${userId}`, {
        method: "DELETE"
      });
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};