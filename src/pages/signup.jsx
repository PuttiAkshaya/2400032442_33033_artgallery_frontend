import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import "./Login.css"; // Reuse styling but we will add specific cards

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Details, 2 = OTP
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "VISITOR",
    otp: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    // Rubric requirement: Min 8, Lower, Upper, Number, Special Character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid Gmail address.");
      return;
    }
    if (!validatePassword(formData.password)) {
      setError("Password too weak (8+ chars, Uppercase, Number, Special Char required).");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await apiService.sendSignupOtp(formData.email);
      setStep(2);
      alert("OTP sent to your email. Please check your inbox.");
    } catch (err) {
      setError(err.message || "Email might be already registered.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiService.verifyAndRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        otp: formData.otp
      });
      
      alert("Account Created Successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card auth-card">
        {step === 1 ? (
          <>
            <h2 className="title">Join Gallery</h2>
            <p className="subtitle">Set up your profile with security</p>
            {error && <div className="error-banner">{error}</div>}
            
            <form onSubmit={handleRequestOTP}>
              <div className="input-group">
                <label>System Role</label>
                <select name="role" onChange={handleChange}>
                   <option value="VISITOR">Visitor</option>
                   <option value="ARTIST">Artist</option>
                   <option value="ADMIN">Admin</option>
                   <option value="CURATOR">Curator</option>
                </select>
              </div>

              <div className="input-group">
                <label>Full Username</label>
                <input type="text" name="username" required onChange={handleChange} placeholder="e.g. creative_mind" />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input type="email" name="email" required onChange={handleChange} placeholder="yourname@gmail.com" />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Password</label>
                  <input type="password" name="password" required onChange={handleChange} placeholder="Strong Pass" />
                </div>
                <div className="input-group">
                  <label>Verify</label>
                  <input type="password" name="confirmPassword" required onChange={handleChange} placeholder="Repeat" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? "Connecting..." : "Register via OTP"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="title">Verify Email</h2>
            <p className="subtitle">Enter the code sent to {formData.email}</p>
            {error && <div className="error-banner">{error}</div>}
            
            <form onSubmit={handleVerifyAndSignup}>
              <div className="input-group">
                <input 
                  type="text" 
                  name="otp" 
                  autoFocus 
                  placeholder="6-Digit Code" 
                  className="otp-input"
                  style={{ textAlign: 'center', fontSize: '2rem', letterSpacing: '10px' }}
                  required 
                  onChange={handleChange} 
                />
              </div>
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? "Verifying..." : "Confirm & Create Account"}
              </button>
              <p onClick={() => setStep(1)} style={{ textAlign: 'center', marginTop: '1rem', cursor: 'pointer', color: '#60a5fa' }}>Back to details</p>
            </form>
          </>
        )}
        
        <p className="footer-text">
          Have an account? <span onClick={() => navigate("/login")} className="link">Sign in</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;