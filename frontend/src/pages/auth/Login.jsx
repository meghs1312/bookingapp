import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "provider")
        navigate("/provider");
      else
        navigate("/services");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          <h1 style={{ color: "#495057", marginBottom: "8px", fontSize: "28px" }}>Login</h1>
          <p style={{ color: "#6c757d", margin: 0, fontSize: "14px" }}>Welcome back! Please sign in to your account</p>
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
              placeholder="Enter your password"
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
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div style={{
          textAlign: "center",
          marginTop: "24px",
          paddingTop: "20px",
          borderTop: "1px solid #e9ecef"
        }}>
          <span style={{ color: "#6c757d", fontSize: "14px" }}>Don't have an account? </span>
          <Link 
            to="/register" 
            style={{
              color: "#6c7ae0",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
