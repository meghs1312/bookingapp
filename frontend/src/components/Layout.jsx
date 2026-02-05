import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Layout({ children, userRole }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const customerMenuItems = [
    { path: "/services", label: "Services", icon: "🏥" },
    { path: "/appointments", label: "My Appointments", icon: "📅" },
  ];

  const providerMenuItems = [
    { path: "/provider", label: "Dashboard", icon: "📊" },
  ];

  const menuItems = userRole === "provider" ? providerMenuItems : customerMenuItems;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? "250px" : "60px",
        backgroundColor: "#6c7ae0",
        color: "white",
        transition: "width 0.3s ease",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Logo/Brand */}
        <div style={{
          padding: "15px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: sidebarOpen ? "space-between" : "center"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "24px", marginRight: "10px" }}>🏥</span>
            {sidebarOpen && <span style={{ fontSize: "18px", fontWeight: "bold" }}>BookingApp</span>}
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "18px"
            }}
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        {/* Menu Items */}
        <div style={{ flex: 1, padding: "20px 0" }}>
          {menuItems.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                padding: "15px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                backgroundColor: location.pathname === item.path ? "rgba(255,255,255,0.1)" : "transparent",
                borderLeft: location.pathname === item.path ? "3px solid white" : "3px solid transparent",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ fontSize: "18px", marginRight: sidebarOpen ? "12px" : "0" }}>
                {item.icon}
              </span>
              {sidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
        </div>

        {/* User section */}
        <div style={{
          padding: "20px",
          borderTop: "1px solid rgba(255,255,255,0.1)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarOpen ? "space-between" : "center"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: sidebarOpen ? "12px" : "0"
              }}>
                👤
              </div>
              {sidebarOpen && (
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {userRole === "provider" ? "Provider" : "Customer"}
                  </div>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <button
                onClick={logout}
                style={{
                  background: "none",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div style={{
          backgroundColor: "white",
          padding: "15px 30px",
          borderBottom: "1px solid #e9ecef",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ margin: 0, color: "#495057", fontSize: "24px" }}>
            {userRole === "provider" ? "Provider Dashboard" : "Appointment Booking"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ color: "#6c757d" }}>
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Page content */}
        <div style={{ 
          flex: 1, 
          padding: "30px", 
          overflowY: "auto",
          backgroundColor: "#f8f9fa"
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
