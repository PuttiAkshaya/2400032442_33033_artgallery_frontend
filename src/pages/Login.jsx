import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";
import apiService from "../services/apiService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(RoleContext);
  const [method, setMethod] = useState("password"); // password or otp
  const [step, setStep] = useState(1); // 1 = input, 2 = verify otp
  const [formData, setFormData] = useState({ username: "", password: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = await apiService.login({
        username: formData.username,
        password: formData.password
      });

      if (userData && userData.id) {
        localStorage.setItem("token", `JWT-${userData.id}`);
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("userRole", userData.role);
        login(userData.role);
        
        if (userData.role === "ADMIN") navigate("/admin");
        else if (userData.role === "ARTIST") navigate("/artist");
        else if (userData.role === "CURATOR") navigate("/curator");
        else navigate("/gallery");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials or user not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card auth-card login-card">
        <h2 className="title">Art Access</h2>
        <p className="subtitle">Secure entry to the gallery</p>
        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handlePasswordLogin}>
          <div className="input-group">
            <label>Sign-in Role</label>
            <select name="role" onChange={handleChange}>
               <option value="VISITOR">Visitor</option>
               <option value="ARTIST">Artist</option>
               <option value="ADMIN">Admin</option>
               <option value="CURATOR">Curator</option>
            </select>
          </div>

          <div className="input-group">
            <label>Username / Email</label>
            <input 
              type="text" 
              name="username" 
              required 
              placeholder="Enter details" 
              onChange={handleChange} 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="••••••••" 
              onChange={handleChange} 
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn primary-btn">
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <p className="footer-text">
          New collector? <span onClick={() => navigate("/signup")} className="link">Register Portal</span>
        </p>
      </div>
    </div>
  );
}

export default Login;