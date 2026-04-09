import React, { useState, useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { login } = useContext(RoleContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("visitor");

  const handleSignup = () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    let existingUsers = JSON.parse(localStorage.getItem("registeredUsers"));
    if (!existingUsers) {
      existingUsers = [
        { username: "admin", password: "123", role: "admin" },
        { username: "artist", password: "123", role: "artist" },
        { username: "curator", password: "123", role: "curator" },
        { username: "test", password: "123", role: "visitor" }
      ];
    }

    const userExists = existingUsers.find(u => u.username === username);

    if (userExists) {
      alert("Username already exists! Please choose another or log in.");
      return;
    }

    existingUsers.push({ username, password, role });
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
    localStorage.setItem("username", username);

    // Show success message and redirect to login page
    alert("Account created successfully! Please log in.");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="visitor">Visitor</option>
          <option value="artist">Artist</option>
          <option value="curator">Curator</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
}

export default Signup;