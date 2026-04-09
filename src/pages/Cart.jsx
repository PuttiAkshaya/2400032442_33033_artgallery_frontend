import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [billingInfo, setBillingInfo] = useState({ name: '', houseNo: '', street: '', city: '', state: '', pincode: '', paymentMode: 'credit-card' });

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  };

  const currentTotal = cartItems.reduce((acc, item) => acc + parsePrice(item.price), 0);

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    setShowCheckout(true);
  };

  const handleConfirmPurchase = (e) => {
    const today = new Date();
    const expectedDelivery = new Date(today);
    expectedDelivery.setDate(today.getDate() + 7);

    const newInvoice = {
      items: [...cartItems],
      total: currentTotal,
      date: today.toLocaleDateString(),
      invoiceId: "INV-" + Math.floor(100000 + Math.random() * 900000),
      customerName: billingInfo.name,
      customerAddress: `${billingInfo.houseNo}, ${billingInfo.street}\n${billingInfo.city}, ${billingInfo.state} - ${billingInfo.pincode}`,
      paymentMode: billingInfo.paymentMode,
      deliveryDate: expectedDelivery.toLocaleDateString(),
      orderStatus: "Dispatched from Art Studio, Packaging in progress",
      username: localStorage.getItem("username") || "Guest"
    };

    // Save to order history
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(newInvoice);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    setInvoiceData(newInvoice);
    setShowCheckout(false);
    setShowInvoice(true);
  };

  const closeInvoice = () => {
    setShowInvoice(false);
    clearCart();
    setBillingInfo({ name: '', houseNo: '', street: '', city: '', state: '', pincode: '', paymentMode: 'credit-card' });
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Your Collection Cart</h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#a1a1aa', fontSize: '1.2rem', marginBottom: '2rem' }}>No masterpieces in your cart yet.</p>
        </div>
      ) : (
        <>
          <div className="gallery-grid">
            {cartItems.map((item, index) => (
              <div key={index} className="art-card">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                )}
                <h3>{item.title}</h3>
                <p>{item.artist}</p>
                <div style={{ padding: '0 20px', marginBottom: '10px' }}>
                  <div className="price">{item.price}</div>
                </div>
                <div className="button-group">
                  <button onClick={() => removeFromCart(index)}>
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button
              style={{ padding: "16px 40px", fontSize: "1.2rem", borderRadius: "16px", background: "linear-gradient(135deg, #10b981, #059669)" }}
              onClick={handleBuyNow}
            >
              Complete Purchase (${currentTotal.toLocaleString()})
            </button>
          </div>
        </>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="modal-overlay" onClick={() => setShowCheckout(false)}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', textAlign: 'left', padding: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Billing Details</h2>
              <p style={{ color: '#a1a1aa' }}>Please enter your details to complete the purchase.</p>
            </div>
            <form onSubmit={handleConfirmPurchase}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e4e4e7' }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={billingInfo.name}
                  onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e4e4e7' }}>House No. / Flat</label>
                  <input type="text" required value={billingInfo.houseNo} onChange={(e) => setBillingInfo({ ...billingInfo, houseNo: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. 101" />
                </div>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e4e4e7' }}>Street / Area</label>
                  <input type="text" required value={billingInfo.street} onChange={(e) => setBillingInfo({ ...billingInfo, street: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. Art Street" />
                </div>
              </div>
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e4e4e7' }}>City</label>
                  <input type="text" required value={billingInfo.city} onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. Hyderabad" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e4e4e7' }}>State</label>
                  <input type="text" required value={billingInfo.state} onChange={(e) => setBillingInfo({ ...billingInfo, state: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. Telangana" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e4e4e7' }}>Pincode</label>
                  <input type="text" required value={billingInfo.pincode} onChange={(e) => setBillingInfo({ ...billingInfo, pincode: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. 500001" />
                </div>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e4e4e7' }}>Mode of Payment</label>
                <select
                  value={billingInfo.paymentMode}
                  onChange={(e) => setBillingInfo({ ...billingInfo, paymentMode: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                >
                  <option value="credit-card" style={{ color: 'black' }}>Credit / Debit Card</option>
                  <option value="upi" style={{ color: 'black' }}>UPI / Net Banking</option>
                  <option value="paypal" style={{ color: 'black' }}>PayPal</option>
                  <option value="cash-on-delivery" style={{ color: 'black' }}>Cash on Delivery</option>
                </select>
              </div>
              <button type="submit" style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Confirm Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoice && invoiceData && (
        <div className="modal-overlay" onClick={() => setShowInvoice(false)}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left', padding: '20px', fontSize: '0.9rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.2rem', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ArtGallery Invoice</h2>
              <p style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>Purchase Successful! Thank you for collecting.</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <div style={{ color: '#a1a1aa', fontSize: '0.75rem' }}>Invoice Number</div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{invoiceData.invoiceId}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#a1a1aa', fontSize: '0.75rem' }}>Payment Mode</div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem', textTransform: 'capitalize' }}>{invoiceData.paymentMode?.replace(/-/g, ' ') || 'N/A'}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#a1a1aa', fontSize: '0.75rem' }}>Date</div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{invoiceData.date}</div>
              </div>
            </div>

            {(invoiceData.customerName || invoiceData.customerAddress) && (
              <div style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ color: '#a1a1aa', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Billed To:</div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '0.1rem' }}>{invoiceData.customerName}</div>
                <div style={{ color: '#e4e4e7', fontSize: '0.85rem', whiteSpace: 'pre-wrap', lineHeight: '1.2' }}>{invoiceData.customerAddress}</div>
              </div>
            )}

            <div style={{ marginBottom: '2rem', maxHeight: '30vh', overflowY: 'auto', paddingRight: '10px' }}>
              {invoiceData.items.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: '500' }}>{item.title}</div>
                    <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{item.artist}</div>
                  </div>
                  <div style={{ color: '#a5b4fc', fontWeight: 'bold' }}>{item.price}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '12px', marginBottom: '1.2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: '#e4e4e7', marginBottom: '0.6rem', fontSize: '0.95rem' }}>Tracking Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>Status:</span>
                  <span style={{ color: '#34d399', fontWeight: '500', fontSize: '0.8rem' }}>{invoiceData.orderStatus}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>Delivery:</span>
                  <span style={{ color: '#e4e4e7', fontWeight: '500', fontSize: '0.8rem' }}>{invoiceData.deliveryDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>Courier:</span>
                  <span style={{ color: '#e4e4e7', fontWeight: '500', fontSize: '0.8rem' }}>Srinath Services</span>
                </div>
              </div>

              <div style={{ width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <iframe
                  title="tracking-map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.757703517457!2d78.388837115!3d17.4447082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1625650000000!5m2!1sen!2sin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(59,130,246,0.1)', padding: '0.8rem', borderRadius: '12px', marginBottom: '1.2rem', border: '1px solid rgba(59,130,246,0.2)' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Total Paid</span>
              <span style={{ color: '#60a5fa', fontSize: '1.2rem', fontWeight: 'bold' }}>${invoiceData.total.toLocaleString()}</span>
            </div>

            <button onClick={closeInvoice} style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s', fontSize: '0.85rem' }}>
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              Close and Continue Browsing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;