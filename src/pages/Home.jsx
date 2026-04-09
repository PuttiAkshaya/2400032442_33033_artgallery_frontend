import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <h1>Art Gallery</h1>
      <p>Discover Culture, Creativity & Digital Exhibitions</p>
      <button onClick={() => navigate("/gallery")}>
        Explore Gallery
      </button>
    </div>
  );
}

export default Home;