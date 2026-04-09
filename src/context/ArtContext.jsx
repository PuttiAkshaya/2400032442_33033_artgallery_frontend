import React, { createContext, useState } from "react";

export const ArtContext = createContext();

export const ArtProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);

  const addArtwork = (art) => {
    setArtworks([...artworks, { ...art, approved: false }]);
  };

  const approveArtwork = (index) => {
    const updated = [...artworks];
    updated[index].approved = true;
    setArtworks(updated);
  };

  const deleteArtwork = (index) => {
    const updated = artworks.filter((_, i) => i !== index);
    setArtworks(updated);
  };

  return (
    <ArtContext.Provider
      value={{ artworks, addArtwork, approveArtwork, deleteArtwork }}
    >
      {children}
    </ArtContext.Provider>
  );
};