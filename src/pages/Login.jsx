import React, { useState, useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(RoleContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("visitor");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter username and password");
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
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
    }

    const foundUser = existingUsers.find(u => u.username === username);

    if (!foundUser) {
      alert("Account does not exist. Please sign up.");
      return;
    }

    if (foundUser.password !== password) {
      alert("Incorrect password. Please try again.");
      return;
    }

    if (foundUser.role !== role) {
      alert(`Invalid role selection! You are registered as ${foundUser.role}. Please select that role.`);
      return;
    }

    login(role);
    localStorage.setItem("username", username);

    if (role === "admin") navigate("/admin");
    else if (role === "artist") navigate("/artist");
    else if (role === "curator") navigate("/curator");
    else navigate("/gallery");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

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

        <button onClick={handleLogin}>Login</button>

        <p style={{ textAlign: "center", marginTop: "1rem", color: "#e4e4e7" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#3b82f6", cursor: "pointer", textDecoration: "underline" }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;