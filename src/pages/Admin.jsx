import React, { useContext } from "react";
import { ArtContext } from "../context/ArtContext";

function Admin() {
  const { artworks, deleteArtwork } = useContext(ArtContext);

  return (
    <div className="gallery-container">
      <h2>Admin Panel - All Artworks</h2>

      {artworks.map((art, index) => (
        <div key={index} className="art-card">
          <h3>{art.title}</h3>
          <p>Price: ₹{art.price}</p>
          <p>Status: {art.approved ? "Approved" : "Pending"}</p>
          <button onClick={() => deleteArtwork(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;