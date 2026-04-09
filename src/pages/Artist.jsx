import React, { useState, useContext } from "react";
import { ArtContext } from "../context/ArtContext";

function Artist() {
  const { addArtwork } = useContext(ArtContext);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

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

  const handleUpload = () => {
    if (!title || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    addArtwork({ title, price, image });
    alert("Artwork uploaded! Waiting for approval.");

    setTitle("");
    setPrice("");
    setImage("");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Upload Artwork</h2>

        <input
          type="text"
          placeholder="Artwork Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", marginLeft: "5px" }}>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "8px", padding: "12px", background: "rgba(0,0,0,0.5)", border: "1px dashed rgba(255,255,255,0.3)" }}
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

        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default Artist;