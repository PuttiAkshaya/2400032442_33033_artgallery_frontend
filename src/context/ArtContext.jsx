import React, { createContext, useState, useEffect } from "react";
import API_BASE_URL from "../apiConfig";

export const ArtContext = createContext();

const CLASSIC_ARTWORKS = [
  { title: "Mona Lisa", artistName: "Leonardo da Vinci", price: "1000000", image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg" },
  { title: "Grace", artistName: "Raja Ravi Varma", price: "850000", image: "https://mapacademy.io/wp-content/uploads/2022/04/raja-ravi-varma-maharashtrian-lady-oil-painting-1s.jpg" },
  { title: "The Persistence of Memory", artistName: "Salvador Dalí", price: "620000", image: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg" },
  { title: "Girl with a Pearl Earring", artistName: "Johannes Vermeer", price: "740000", image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg" },
  { title: "Starry Night", artistName: "Vincent van Gogh", price: "900000", image: "https://i.etsystatic.com/26627125/r/il/e3041b/4618949521/il_1080xN.4618949521_ti1n.jpg" },
  { title: "Water Lilies", artistName: "Claude Monet", price: "780000", image: "https://livedoor.blogimg.jp/meigakan/imgs/4/6/46e3ce53.jpg" },
  { title: "The Weeping Woman", artistName: "Pablo Picasso", price: "690000", image: "https://sothebys-md.brightspotcdn.com/webnative/images/2e/fe/0cef4f4b41bbaec6aeabdad9c518/pf2235-cj94c-t3-01.jpg" },
  { title: "The Kiss", artistName: "Gustav Klimt", price: "880000", image: "https://daily-norm.com/wp-content/uploads/2012/02/klimt-ref-zoom.jpg" },
  { title: "The Scream", artistName: "Edvard Munch", price: "950000", image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg" },
  { title: "The Two Fridas", artistName: "Frida Kahlo", price: "720000", image: "https://www.fridakahlo.org/assets/img/paintings/the-two-fridas.jpg" },
];

export const ArtProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const initializeArtworks = async () => {
      const data = await fetchArtworks();
      
      // Auto-sync classic artworks if DB is empty
      if (userId && data.length === 0) {
         console.log("Auto-syncing classic collection...");
         for (const art of CLASSIC_ARTWORKS) {
            await fetch(`${API_BASE_URL}/artworks`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: art.title,
                artist: { id: parseInt(userId) },
                price: art.price,
                imageUrl: art.image,
                category: "Classic",
                approved: true
              })
            });
         }
         fetchArtworks();
      }
    };
    initializeArtworks();
  }, [userId]); // Adding dependency if userId changes (login)

  const fetchArtworks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/artworks`);
      const data = await response.json();
      setArtworks(data);
      return data;
    } catch (error) {
      console.error("Error fetching artworks:", error);
      return [];
    }
  };

  const addArtwork = async (art) => {
    try {
      const response = await fetch(`${API_BASE_URL}/artworks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...art, approved: false }),
      });
      console.log("Upload status:", response.status);
      if (response.ok) {
        fetchArtworks();
      } else {
        const err = await response.text();
        console.error("Upload failed server-side:", err);
      }
    } catch (error) {
      console.error("Error adding artwork:", error);
    }
  };

  const approveArtwork = async (id) => {
    try {
      const art = artworks.find(a => a.id === id);
      const updatePayload = {
        ...art,
        approved: true,
        artist: art.artist && art.artist.id ? { id: art.artist.id } : null
      };
      
      const response = await fetch(`${API_BASE_URL}/artworks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      if (response.ok) {
        alert("Artwork approved successfully!");
        fetchArtworks();
      } else {
        const errorMsg = await response.text();
        console.error("Approval failed:", errorMsg);
        alert("Failed to approve: " + errorMsg);
      }
    } catch (error) {
      console.error("Error approving artwork:", error);
    }
  };

  const deleteArtwork = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/artworks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) fetchArtworks();
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  const markAsSold = async (id) => {
    try {
      const art = artworks.find(a => a.id === id);
      if (!art) return;

      const response = await fetch(`${API_BASE_URL}/artworks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...art, sold: true }),
      });

      if (response.ok) fetchArtworks();
    } catch (error) {
      console.error("Error marking artwork as sold:", error);
    }
  };

  const fetchArtistArtworks = async (artistId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/artworks/artist/${artistId}`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error("Error fetching artist artworks:", error);
      return [];
    }
  };

  return (
    <ArtContext.Provider
      value={{ artworks, addArtwork, approveArtwork, deleteArtwork, fetchArtworks, markAsSold, fetchArtistArtworks }}
    >
      {children}
    </ArtContext.Provider>
  );
};