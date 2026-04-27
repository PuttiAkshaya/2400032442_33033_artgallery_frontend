import React, { useContext } from "react";
import { ArtContext } from "../context/ArtContext";

function Admin() {
  const { artworks: contextArtworks, deleteArtwork } = useContext(ArtContext);

  return (
    <div className="gallery-container">
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: '3rem', 
        padding: '40px', 
        borderRadius: '30px', 
        background: 'rgba(255,255,255,0.03)', 
        border: '1px solid rgba(255,255,255,0.1)' 
      }}>
        <h1 className="gallery-title" style={{ margin: 0, fontSize: '3rem' }}>Management Console</h1>
        <p style={{ color: '#a1a1aa', marginBottom: '1rem' }}>Total Artworks in DB: {contextArtworks.length}</p>
        <div style={{ padding: '10px 20px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
           <p style={{ color: '#60a5fa', fontSize: '0.9rem', margin: 0 }}>✨ Auto-Sync Active: Classic collection is automatically maintained.</p>
        </div>
      </div>

      <div className="gallery-grid">
        {contextArtworks.map((art) => (
          <div key={art.id} className="art-card">
            {art.imageUrl && <img src={art.imageUrl} alt={art.title} />}
            <h3>{art.title}</h3>
            <p>Artist ID: {art.artist?.id || "N/A"}</p>
            <p className="price">${Number(art.price).toLocaleString()}</p>
            <p style={{ color: art.approved ? '#34d399' : '#fbbf24' }}>
               Status: {art.approved ? "Approved & Live" : "Pending Approval"}
            </p>
            <div className="button-group">
               <button onClick={() => deleteArtwork(art.id)} style={{ background: '#ef4444' }}>Delete Permanent</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;