import React, { useState, useEffect } from "react";
import "./Gallery.css"; // Reuse gallery styles for glassmorphism

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const currentUser = localStorage.getItem("username") || "Guest";

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    // Optionally filter by user if username was stored correctly
    // setOrders(allOrders.filter(o => o.username === currentUser));
    setOrders(allOrders);
  }, [currentUser]);

  const handleCancelOrder = (invoiceId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const updatedOrders = allOrders.filter(o => o.invoiceId !== invoiceId);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      alert("Order " + invoiceId + " has been cancelled successfully.");
    }
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">My Purchase History</h1>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "4rem", color: "#a1a1aa" }}>
          <h2>No orders found.</h2>
          <p>Start your collection by visiting the gallery!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
          {orders.map((order, idx) => (
            <div key={idx} className="glass" style={{ padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#3b82f6' }}>Order {order.invoiceId}</h3>
                  <p style={{ margin: '5px 0 0 0', color: '#a1a1aa', fontSize: '0.9rem' }}>Date: {order.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#34d399', fontWeight: 'bold' }}>{order.orderStatus}</div>
                  <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Delivery by {order.deliveryDate}</div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#e4e4e7', marginBottom: '0.8rem' }}>Items:</h4>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    <span>{item.title} by {item.artist}</span>
                    <span style={{ fontWeight: 'bold', color: '#a5b4fc' }}>{item.price}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Total: <span style={{ color: '#60a5fa' }}>${order.total.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => handleCancelOrder(order.invoiceId)}
                  style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
