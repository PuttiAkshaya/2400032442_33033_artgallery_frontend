import React, { useState, useContext } from "react";
import { ArtContext } from "../context/ArtContext";
import "./Gallery.css";

function Artist() {
  const { addArtwork, artworks, deleteArtwork, fetchArtistArtworks } = useContext(ArtContext);
  const currentUsername = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [personalArtworks, setPersonalArtworks] = useState([]);

  React.useEffect(() => {
    if (userId) {
      loadMyArt();
    }
  }, [userId, artworks]); // Reload when global artworks change (e.g. after upload or approval)

  const loadMyArt = async () => {
    const data = await fetchArtistArtworks(userId);
    setPersonalArtworks(data);
  };

  if (!userId && currentUsername) {
    return (
      <div className="gallery-container">
        <div className="card glass" style={{ margin: "50px auto", color: "white" }}>
          <h2>Session Link Incomplete</h2>
          <p>Please <strong>Log Out</strong> and <strong>Log In</strong> again to synchronize your Artist account with the backend server.</p>
        </div>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!title || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    const userId = localStorage.getItem("userId");

    await addArtwork({ 
      title, 
      price: parseFloat(price), 
      imageUrl: image,
      description: "Original Artwork",
      category: "Modern Art",
      culturalHistory: "Created by contemporary artist",
      artist: userId ? { id: parseInt(userId) } : null,
      sold: false
    });
    alert("Artwork uploaded! Waiting for approval.");

    setTitle("");
    setPrice("");
    setImage("");
    loadMyArt();
  };

  return (
    <div className="gallery-container">
      <div className="card shadow-lg" style={{ margin: "0 auto 50px" }}>
        <h2>Upload New Masterpiece</h2>

        <input
          type="text"
          placeholder="Artwork Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", marginLeft: "5px" }}>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "8px", padding: "12px", background: "rgba(0,0,0,0.5)", border: "1px dashed rgba(255,255,255,0.3)", width: "100%", boxSizing: "border-box" }}
          />
        </div>

        {image && (
          <div style={{ marginBottom: "20px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
            <img
              src={image}
              alt="Preview"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </div>
        )}

        <button onClick={handleUpload} style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}>Upload Artwork</button>
      </div>

      <h1 className="gallery-title">My Artistic Portfolio</h1>

      {/* Sales Summary Section */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px", justifyContent: "center" }}>
        <div className="card glass" style={{ flex: 1, textAlign: "center", padding: "20px" }}>
          <h3 style={{ color: "#a1a1aa", fontSize: "0.9rem", marginBottom: "5px" }}>Total Uploads</h3>
          <p style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{personalArtworks.length}</p>
        </div>
        <div className="card glass" style={{ flex: 1, textAlign: "center", padding: "20px" }}>
          <h3 style={{ color: "#a1a1aa", fontSize: "0.9rem", marginBottom: "5px" }}>Approved</h3>
          <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#10b981" }}>
            {personalArtworks.filter(a => a.approved).length}
          </p>
        </div>
        <div className="card glass" style={{ flex: 1, textAlign: "center", padding: "20px" }}>
          <h3 style={{ color: "#a1a1aa", fontSize: "0.9rem", marginBottom: "5px" }}>Art Sold</h3>
          <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#3b82f6" }}>
            {personalArtworks.filter(a => a.sold).length}
          </p>
        </div>
      </div>

      <div className="gallery-grid">
        {personalArtworks.map((art) => (
          <div key={art.id} className="art-card">
            <img src={art.imageUrl || art.image} alt={art.title} />
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{art.title}</h3>
              <div className="price" style={{ color: "#818cf8", fontSize: "1.1rem", fontWeight: "bold" }}>${art.price}</div>
              
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{ 
                  color: art.approved ? "#10b981" : "#f59e0b", 
                  background: art.approved ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  width: "fit-content"
                }}>
                  {art.approved ? "✓ Approved" : "⏱ Pending Approval"}
                </p>
                
                <p style={{ 
                  color: art.sold ? "#ffffff" : "#ffffff",
                  background: art.sold ? "linear-gradient(135deg, #ef4444, #991b1b)" : "linear-gradient(135deg, #3b82f6, #1e40af)",
                  padding: "8px 16px",
                  borderRadius: "12px",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  width: "100%",
                  textAlign: "center",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                }}>
                  {art.sold ? "SOLD OUT" : "AVAILABLE"}
                </p>
              </div>

              <div className="button-group" style={{ marginTop: "1.5rem" }}>
                <button 
                  onClick={() => deleteArtwork(art.id)}
                  style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)", width: "100%", borderRadius: "8px" }}
                >
                  Remove Artwork
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {personalArtworks.length === 0 && (
        <div className="card glass" style={{ textAlign: 'center', marginTop: '2rem', padding: "40px" }}>
          <p style={{ color: '#a1a1aa', fontSize: "1.1rem" }}>Your studio is empty! Start by uploading your first masterpiece above.</p>
        </div>
      )}
    </div>
  );
}

export default Artist;