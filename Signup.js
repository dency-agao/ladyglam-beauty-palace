import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./../styles/signup.css";
import signupBg from "../assets/signup-bg.jpg"; // Import background image

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      setMessage(response.data.message);
      // Clear form after successful signup
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Implement Google Sign up logic here
    console.log("Google signup clicked");
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${signupBg})` }}>
      <div className="signup-form-container">
        <h2>Create Account</h2>
        <p className="subtitle">Please fill in your details to register</p>

        {message && (
          <div className={`message ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <button 
          type="button" 
          className="google-signup-button"
          onClick={handleGoogleSignup}
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="google-icon" 
          />
          Continue with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input 
              type="text" 
              name="first_name" 
              placeholder="First Name" 
              value={formData.first_name}
              onChange={handleChange} 
              required 
              className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
            />
            {errors.first_name && <div className="error-text">{errors.first_name}</div>}
          </div>
          <div className="form-group">
            <input 
              type="text" 
              name="last_name" 
              placeholder="Last Name" 
              value={formData.last_name}
              onChange={handleChange} 
              required 
              className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
            />
            {errors.last_name && <div className="error-text">{errors.last_name}</div>}
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange} 
              required 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
          <div className="form-group">
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={formData.username}
              onChange={handleChange} 
              required 
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            />
            {errors.username && <div className="error-text">{errors.username}</div>}
          </div>
          <div className="form-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange} 
              required 
              minLength="6"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>

          <button 
            type="submit" 
            className="signup-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="login-prompt">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
