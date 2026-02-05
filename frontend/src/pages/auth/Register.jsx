import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("/auth/register", form);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #6c7ae0 0%, #a8edea 100%)",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "40px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}>
        {/* Logo/Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>🏥</div>
          <h1 style={{ color: "#495057", marginBottom: "8px", fontSize: "28px" }}>Create Account</h1>
          <p style={{ color: "#6c757d", margin: 0, fontSize: "14px" }}>Join our healthcare platform today</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #f5c6cb",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #c3e6cb",
            fontSize: "14px"
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "6px", 
              color: "#495057", 
              fontSize: "14px",
              fontWeight: "500"
            }}>Full Name</label>
            <input 
              name="name" 
              type="text"
              value={form.name}
              onChange={handleChange} 
              placeholder="Enter your full name"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e9ecef",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "border-color 0.2s ease",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#6c7ae0"}
              onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
            />
          </div>
          
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "6px", 
              color: "#495057", 
              fontSize: "14px",
              fontWeight: "500"
            }}>Email</label>
            <input 
              name="email" 
              type="email"
              value={form.email}
              onChange={handleChange} 
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e9ecef",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "border-color 0.2s ease",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#6c7ae0"}
              onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
            />
          </div>
          
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "6px", 
              color: "#495057", 
              fontSize: "14px",
              fontWeight: "500"
            }}>Password</label>
            <input 
              name="password" 
              type="password" 
              value={form.password}
              onChange={handleChange} 
              placeholder="Create a strong password"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e9ecef",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "border-color 0.2s ease",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#6c7ae0"}
              onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
            />
          </div>
          
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "6px", 
              color: "#495057", 
              fontSize: "14px",
              fontWeight: "500"
            }}>Account Type</label>
            <select 
              name="role" 
              value={form.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e9ecef",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "border-color 0.2s ease",
                outline: "none",
                backgroundColor: "white"
              }}
              onFocus={(e) => e.target.style.borderColor = "#6c7ae0"}
              onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
            >
              <option value="customer">👤 Patient/Customer</option>
              <option value="provider">👨‍⚕️ Healthcare Provider</option>
            </select>
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? "#adb5bd" : "#6c7ae0",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "14px 20px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s ease",
              marginTop: "10px"
            }}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={{
          textAlign: "center",
          marginTop: "24px",
          paddingTop: "20px",
          borderTop: "1px solid #e9ecef"
        }}>
          <span style={{ color: "#6c757d", fontSize: "14px" }}>Already have an account? </span>
          <Link 
            to="/login" 
            style={{
              color: "#6c7ae0",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
