import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Gallery.css";
import { CartContext } from "../context/CartContext";
import { RoleContext } from "../context/RoleContext";
import { ArtContext } from "../context/ArtContext";

const artworks = [
  {
    id: 1,
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    price: "$1,000,000",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
  },
  {
    id: 2,
    title: "Grace",
    artist: "Raja Ravi Varma",
    price: "$850,000",
    image: "https://mapacademy.io/wp-content/uploads/2022/04/raja-ravi-varma-maharashtrian-lady-oil-painting-1s.jpg",
  },
  {
    id: 3,
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    price: "$620,000",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
  },
  {
    id: 4,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    price: "$740,000",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
  },
  {
    id: 5,
    title: "Starry Night",
    artist: "Vincent van Gogh",
    price: "$900,000",
    image: "https://i.etsystatic.com/26627125/r/il/e3041b/4618949521/il_1080xN.4618949521_ti1n.jpg",
  },
  {
    id: 6,
    title: "Water Lilies",
    artist: "Claude Monet",
    price: "$780,000",
    image: "https://livedoor.blogimg.jp/meigakan/imgs/4/6/46e3ce53.jpg",
  },
  {
    id: 7,
    title: "The Weeping Woman",
    artist: "Pablo Picasso",
    price: "$690,000",
    image: "https://sothebys-md.brightspotcdn.com/webnative/images/2e/fe/0cef4f4b41bbaec6aeabdad9c518/pf2235-cj94c-t3-01.jpg",
  },
  {
    id: 8,
    title: "The Kiss",
    artist: "Gustav Klimt",
    price: "$880,000",
    image: "https://daily-norm.com/wp-content/uploads/2012/02/klimt-ref-zoom.jpg",
  },
  {
    id: 9,
    title: "The Scream",
    artist: "Edvard Munch",
    price: "$950,000",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
  },
  {
    id: 10,
    title: "The Two Fridas",
    artist: "Frida Kahlo",
    price: "$720,000",
    image: "https://www.fridakahlo.org/assets/img/paintings/the-two-fridas.jpg",
  },
  {
    id: 11,
    title: "Impression, Sunrise",
    artist: "Claude Monet",
    price: "$670,000",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
  },
  {
    id: 12,
    title: "Guernica",
    artist: "Pablo Picasso",
    price: "$1,200,000",
    image: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
  },
  {
    id: 13,
    title: "Sunflowers",
    artist: "Vincent van Gogh",
    price: "$830,000",
    image: "https://uploads7.wikiart.org/images/vincent-van-gogh/still-life-vase-with-twelve-sunflowers.jpg",
  },
  {
    id: 14,
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    price: "$1,100,000",
    image: "https://i.etsystatic.com/28120423/r/il/b7c254/3039865765/il_fullxfull.3039865765_ax49.jpg",
  },
  {
    id: 15,
    title: "Shakuntala",
    artist: "Raja Ravi Varma",
    price: "$780,000",
    image: "https://i.etsystatic.com/19820675/r/il/d90db6/1994290191/il_1140xN.1994290191_dbxw.jpg",
  },
  {
    id: 16,
    title: "Lady with Fruit",
    artist: "Amrita Sher-Gil",
    price: "$640,000",
    image: "https://www.tallengestore.com/cdn/shop/products/RestingFruitSellers-AmritaSher-Gil-IndianArtPainting_0f25038d-a77b-4b93-a5c2-7e25b2a64468.jpg?v=1619410195",
  },
  {
    id: 17,
    title: "Bharat Mata",
    artist: "Abanindranath Tagore",
    price: "$700,000",
    image: "https://smarthistory.org/wp-content/uploads/2024/02/top.jpg",
  },
  {
    id: 18,
    title: "The Great Wave off Kanagawa",
    artist: "Hokusai",
    price: "$2,500,000",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Great_Wave_off_Kanagawa2.jpg",
  },
  {
    id: 19,
    title: "Cafe Terrace at Night",
    artist: "Vincent van Gogh",
    price: "$1,850,000",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Vincent_Willem_van_Gogh_015.jpg",
  },
  {
    id: 20,
    title: "Wanderer above the Sea of Fog",
    artist: "Caspar David Friedrich",
    price: "$980,000",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
  },
  {
    id: 21,
    title: "Hamsa Damayanti",
    artist: "Raja Ravi Varma",
    price: "$1,200,000",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Raja_Ravi_Varma%2C_Hamsa_Damayanthi.jpg",
  },
  {
    id: 22,
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    price: "$8,000,000",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Última_Cena_-_Da_Vinci_5.jpg",
  },
  {
    id: 23,
    title: "American Gothic",
    artist: "Grant Wood",
    price: "$1,300,000",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
  },
  {
    id: 24,
    title: "Nighthawks",
    artist: "Edward Hopper",
    price: "$2,100,000",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg",
  }
];

function Gallery() {
  const { addToCart } = useContext(CartContext); // ✅ Using global cart
  const { isLoggedIn } = useContext(RoleContext);
  const { artworks: contextArtworks } = useContext(ArtContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [billingInfo, setBillingInfo] = useState({ name: '', houseNo: '', street: '', city: '', state: '', pincode: '', paymentMode: 'credit-card' });
  const [invoiceData, setInvoiceData] = useState(null);
  const [selectedArt, setSelectedArt] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.toString().replace(/[^0-9]/g, ''), 10);
  };

  // Combine classic artworks with explicitly approved ones from Curator
  const displayArtworks = [
    ...artworks,
    ...(contextArtworks ? contextArtworks.filter(a => a.approved) : [])
  ];

  const filteredArtworks = displayArtworks.filter(art =>
    art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (art.artist && art.artist.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBuy = (art) => {
    if (!isLoggedIn && localStorage.getItem("isLoggedIn") !== "true") {
      setShowAuthModal(true);
      return;
    }
    setSelectedArt(art);
    setShowCheckout(true);
  };

  const handleConfirmPurchase = (e) => {
    const today = new Date();
    const expectedDelivery = new Date(today);
    expectedDelivery.setDate(today.getDate() + 7);

    const newInvoice = {
      items: [selectedArt],
      total: parsePrice(selectedArt.price),
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
    setBillingInfo({ name: '', houseNo: '', street: '', city: '', state: '', pincode: '', paymentMode: 'credit-card' });
    setSelectedArt(null);
  };

  const handleAddToCart = (art) => {
    if (!isLoggedIn && localStorage.getItem("isLoggedIn") !== "true") {
      setShowAuthModal(true);
      return;
    }
    addToCart(art); // ✅ Changed here
    alert(`${art.title} added to cart`);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Premium Art Collection</h1>

      <div style={{ padding: '0 1rem', marginBottom: '3rem', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search for masterpieces or artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', maxWidth: '600px', padding: '1rem 1.5rem', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '1.1rem', outline: 'none', transition: 'border-color 0.3s' }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
        />
      </div>

      {filteredArtworks.length === 0 && (
        <div style={{ textAlign: 'center', color: '#a1a1aa', fontSize: '1.2rem', marginTop: '2rem', height: '50vh' }}>
          No artworks found matching "{searchTerm}"
        </div>
      )}

      <div className="gallery-grid">
        {filteredArtworks.map((art, index) => (
          <div key={art.id || `ctx-${index}`} className="art-card">
            <img src={art.image} alt={art.title} />
            <h3>{art.title}</h3>
            <p>{art.artist || "Independent Artist"}</p>
            <h4 className="price">{art.price.toString().startsWith('$') ? art.price : `$${Number(art.price).toLocaleString()}`}</h4>

            <div className="button-group">
              <button onClick={() => handleBuy(art)}>
                Buy Now
              </button>
              <button onClick={() => handleAddToCart(art)}>
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>

      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem', color: '#fff' }}>Join ArtGallery</h2>
            <p style={{ marginBottom: '2.5rem', opacity: 0.8, color: '#e2e8f0' }}>
              Please login or create an account to start collecting limited edition masterpieces and completing your gallery.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <button onClick={() => navigate('/login')} style={{ width: '100%', padding: '1rem' }}>
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6' }}
              >
                Sign Up
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: 'white', marginTop: '0.5rem' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="modal-overlay" onClick={() => setShowCheckout(false)}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', textAlign: 'left', padding: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Billing Details</h2>
              <p style={{ color: '#a1a1aa' }}>Please enter your details to complete the purchase of {selectedArt?.title}.</p>
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

            <button onClick={closeInvoice} style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s', fontSize: '0.85rem' }}
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

export default Gallery;