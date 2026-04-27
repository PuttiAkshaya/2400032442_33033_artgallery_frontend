import React, { useState, useEffect } from "react";
import "./Gallery.css";
import API_BASE_URL from "../apiConfig";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/visitor/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="gallery-container">
        <div style={{ textAlign: "center", marginTop: "4rem", color: "white" }}>
          <h2>Synchronizing with Gallery Server...</h2>
        </div>
      </div>
    );
  }

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await fetch(`${API_BASE_URL}/orders/${orderId}`, { method: 'DELETE' });
        fetchOrders();
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    }
  };

  const handleDownloadInvoice = async (order) => {
    const element = document.getElementById(`invoice-card-${order.id}`);
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0a0a1a"
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${order.invoiceId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
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
            <div key={idx} id={`invoice-card-${order.id}`} className="glass" style={{ padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', background: '#0a0a1a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#3b82f6' }}>Order #{order.id}</h3>
                  <p style={{ margin: '5px 0 0 0', color: '#a1a1aa', fontSize: '0.9rem' }}>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#34d399', fontWeight: 'bold' }}>{order.status}</div>
                  <div style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>Verified Purchase</div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#e4e4e7', marginBottom: '0.8rem' }}>Masterpiece Details:</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    {order.artwork.imageUrl && <img src={order.artwork.imageUrl} alt={order.artwork.title} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />}
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{order.artwork.title}</div>
                      <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>by {order.artwork.artist?.username || "Selected Artist"}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#a5b4fc', fontSize: '1.2rem' }}>${order.artwork.price}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Price Paid: <span style={{ color: '#60a5fa' }}>${order.artwork.price.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
