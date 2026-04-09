import React, { useContext } from "react";
import { ArtContext } from "../context/ArtContext";

function Curator() {
  const { artworks, approveArtwork } = useContext(ArtContext);

  return (
    <div className="gallery-container">
      <h2>Pending Artworks</h2>

      {artworks.map((art, index) =>
        !art.approved ? (
          <div key={index} className="art-card">
            <h3>{art.title}</h3>
            <p>Price: ₹{art.price}</p>
            <button onClick={() => approveArtwork(index)}>
              Approve
            </button>
          </div>
        ) : null
      )}
    </div>
  );
}

export default Curator;