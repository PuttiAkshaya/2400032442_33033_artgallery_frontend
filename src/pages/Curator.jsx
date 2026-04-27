import React, { useContext } from "react";
import { ArtContext } from "../context/ArtContext";
import "./Gallery.css";

function Curator() {
  const { artworks, approveArtwork } = useContext(ArtContext);
  console.log("Current artworks in Curator context:", artworks);

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Curator Review Panel</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px', color: '#a1a1aa' }}>Verify and approve new masterpieces for the public gallery.</p>

      <div className="gallery-grid">
        {artworks.filter(art => !art.approved).map((art) => (
          <div key={art.id} className="art-card">
            <img src={art.imageUrl || art.image} alt={art.title} />
            <h3>{art.title}</h3>
            <p>By {art.artist ? (typeof art.artist === 'string' ? art.artist : art.artist.username) : "Independent Artist"}</p>
            <div className="price">${art.price}</div>
            
            <div className="button-group">
              <button 
                onClick={() => approveArtwork(art.id)}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', width: '100%' }}
              >
                Approve Masterpiece
              </button>
            </div>
          </div>
        ))}
      </div>

      {artworks.filter(art => !art.approved).length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '4rem', color: '#a1a1aa' }}>
          <h2>Zero items pending</h2>
          <p>The queue is currently empty. Check back later!</p>
        </div>
      )}
    </div>
  );
}

export default Curator;