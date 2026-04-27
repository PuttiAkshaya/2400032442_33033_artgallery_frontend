import React, { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Gallery.css";
import { CartContext } from "../context/CartContext";
import { RoleContext } from "../context/RoleContext";
import { ArtContext } from "../context/ArtContext";
import API_BASE_URL from "../apiConfig";

const artworks = []; // DB-only now

function Gallery() {
  const { addToCart } = useContext(CartContext);
  const { role, isLoggedIn } = useContext(RoleContext);
  const { artworks: contextArtworks, fetchArtworks, markAsSold } = useContext(ArtContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    paymentMode: "UPI / Net Banking"
  });

  const filteredArtworks = useMemo(() => {
    return contextArtworks.filter((art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.artist && art.artist.username && art.artist.username.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [contextArtworks, searchQuery]);

  const handleBuyNow = (art) => {
    if (!isLoggedIn) {
      alert("Please Sign In first to purchase artwork!");
      navigate("/login");
      return;
    }
    setSelectedArt(art);
    setShowInvoice(true);
  };

  const handleAddToCartClick = (art) => {
    if (!isLoggedIn) {
      alert("Please Sign In first to add items to your cart!");
      navigate("/login");
      return;
    }
    addToCart(art);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveOrderToDB = async (item) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return "No User ID found";

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor: { id: parseInt(userId) },
          artwork: { id: item.id },
          status: "COMPLETED"
        })
      });
      if (response.ok) return true;
      return `Server Error ${response.status}`;
    } catch (e) {
      console.error("Failed to save order to DB:", e);
      return "Network/Connection Failure";
    }
  };

  const handleConfirmPurchase = async (e) => {
    e.preventDefault();
    
    // Mark as sold in backend if it's a context artwork
    if (selectedArt.id) {
       await markAsSold(selectedArt.id);
       const saved = await saveOrderToDB(selectedArt);
       if (saved !== true) {
          alert(`Purchase Failed: ${saved}. Please ensure Admin has Auto-Synced the database.`);
          return;
       }
    }

    const newInvoice = {
      ...formData,
      artTitle: selectedArt.title,
      price: selectedArt.price,
      date: new Date().toLocaleDateString(),
      invoiceId: Math.floor(Math.random() * 1000000)
    };
    setSelectedArt(newInvoice);
    // Note: In a real app, you'd show a success message or download PDF here
  };

  return (
    <div className="gallery-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Title or Artist..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="search-icon">🔍</div>
      </div>

      <div className="gallery-grid">
        {filteredArtworks.map((art) => (
          <div key={art.id} className="art-card">
            {art.imageUrl && <img src={art.imageUrl} alt={art.title} />}
            <div className="art-info">
              <h3>{art.title}</h3>
              <p>by {art.artist?.username || "Masterpiece Collection"}</p>
              <div className="price-tag">${Number(art.price).toLocaleString()}</div>
              
              <div className="button-group">
                {!art.sold ? (
                  <>
                    <button className="add-to-cart" onClick={() => handleAddToCartClick(art)}>
                      Add to Cart
                    </button>
                    <button className="buy-now" onClick={() => handleBuyNow(art)}>
                      Buy Now
                    </button>
                  </>
                ) : (
                  <button className="sold-out" disabled>SOLD</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showInvoice && !selectedArt?.invoiceId && (
        <div className="invoice-modal">
          <div className="invoice-content">
            <h2>Checkout Detail</h2>
            <form onSubmit={handleConfirmPurchase}>
              <div className="form-grid">
                <input type="text" name="fullName" placeholder="Full Name" required onChange={handleInputChange} />
                <input type="text" name="houseNo" placeholder="House No. / Flat" required onChange={handleInputChange} />
                <input type="text" name="street" placeholder="Street / Area" required onChange={handleInputChange} />
                <input type="text" name="city" placeholder="City" required onChange={handleInputChange} />
                <input type="text" name="state" placeholder="State" required onChange={handleInputChange} />
                <input type="text" name="pincode" placeholder="Pincode" required onChange={handleInputChange} />
              </div>
              <label>Mode of Payment</label>
              <select name="paymentMode" onChange={handleInputChange}>
                <option>UPI / Net Banking</option>
                <option>Credit / Debit Card</option>
              </select>
              <button type="submit" className="confirm-btn">CONFIRM PAYMENT</button>
              <button type="button" className="close-btn" onClick={() => setShowInvoice(false)}>CANCEL</button>
            </form>
          </div>
        </div>
      )}

      {selectedArt?.invoiceId && (
        <div className="invoice-modal">
          <div className="invoice-content success-invoice">
            <h2>🎉 Purchase Successful!</h2>
            <div className="invoice-details">
              <p><strong>Invoice ID:</strong> #{selectedArt.invoiceId}</p>
              <p><strong>Item:</strong> {selectedArt.artTitle}</p>
              <p><strong>Amount Paid:</strong> ${Number(selectedArt.price).toLocaleString()}</p>
              <p><strong>Delivery to:</strong> {selectedArt.fullName}, {selectedArt.city}</p>
            </div>
            <p className="success-note">Your order has been recorded in the database. You can view it in My Orders.</p>
            <button className="confirm-btn" onClick={() => { setShowInvoice(false); setSelectedArt(null); }}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;