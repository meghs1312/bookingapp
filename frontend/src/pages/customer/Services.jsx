import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Layout from "../../components/Layout";

export default function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    axios.get("/services").then(res => setServices(res.data));
  }, []);

  return (
    <Layout userRole={userRole}>
      <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#495057", marginBottom: "8px", fontSize: "28px" }}>Available Services</h2>
          <p style={{ color: "#6c757d", margin: 0 }}>Browse and book appointments with our healthcare providers</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
          {services.map((service) => (
            <div key={service._id} style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #e9ecef",
              borderRadius: "12px",
              padding: "24px",
              transition: "all 0.2s ease",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
            }}>
              
              <div style={{ marginBottom: "16px" }}>
                <h3 style={{ color: "#495057", marginBottom: "8px", fontSize: "20px" }}>{service.name}</h3>
                <p style={{ color: "#6c757d", margin: 0, lineHeight: "1.5" }}>{service.description}</p>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "12px", color: "#6c757d", backgroundColor: "#e9ecef", padding: "4px 8px", borderRadius: "4px" }}>
                    {service.duration || 30} min
                  </span>
                  <span style={{ fontSize: "12px", color: "#28a745", fontWeight: "bold" }}>Available</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate(`/book/${service._id}`)}
                style={{
                  width: "100%",
                  backgroundColor: "#6c7ae0",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#5a6fd8"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#6c7ae0"}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
        
        {services.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#6c757d" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏥</div>
            <h3 style={{ marginBottom: "8px" }}>No Services Available</h3>
            <p>Please check back later for available services.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
