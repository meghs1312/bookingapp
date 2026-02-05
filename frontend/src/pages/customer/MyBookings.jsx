import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Layout from "../../components/Layout";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/appointments/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "cancelled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return "✅";
      case "pending":
        return "⏳";
      case "cancelled":
        return "❌";
      default:
        return "❓";
    }
  };

  if (loading) {
    return (
      <Layout userRole={userRole}>
        <div style={{ textAlign: "center", padding: "60px" }}>
          <div style={{ fontSize: "24px", marginBottom: "16px" }}>⏳</div>
          <p>Loading your appointments...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout userRole={userRole}>
      <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#495057", marginBottom: "8px", fontSize: "28px" }}>My Appointments</h2>
          <p style={{ color: "#6c757d", margin: 0 }}>Track your upcoming and past appointments</p>
        </div>

        {bookings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#6c757d" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📅</div>
            <h3 style={{ marginBottom: "8px" }}>No Appointments</h3>
            <p>You don't have any appointments yet. Book your first appointment!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {bookings.map(booking => (
              <div key={booking._id} style={{
                border: "1px solid #e9ecef",
                borderRadius: "12px",
                padding: "24px",
                backgroundColor: "#f8f9fa",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: "#495057", marginBottom: "8px", fontSize: "18px" }}>
                      {booking.service?.name || "Service"}
                    </h4>
                    <p style={{ color: "#6c757d", margin: 0, lineHeight: "1.5" }}>
                      {booking.service?.description || "No description available"}
                    </p>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "white",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    border: `2px solid ${getStatusColor(booking.status)}`
                  }}>
                    <span>{getStatusIcon(booking.status)}</span>
                    <span style={{ 
                      color: getStatusColor(booking.status), 
                      fontWeight: "600",
                      textTransform: "capitalize",
                      fontSize: "14px"
                    }}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "16px" }}>👨‍⚕️</span>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6c757d" }}>Provider</div>
                      <div style={{ fontSize: "14px", fontWeight: "500", color: "#495057" }}>
                        {booking.provider?.name || "N/A"}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "16px" }}>📅</span>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6c757d" }}>Date</div>
                      <div style={{ fontSize: "14px", fontWeight: "500", color: "#495057" }}>
                        {booking.slot?.date ? new Date(booking.slot.date).toLocaleDateString() : "N/A"}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "16px" }}>⏰</span>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6c757d" }}>Time</div>
                      <div style={{ fontSize: "14px", fontWeight: "500", color: "#495057" }}>
                        {booking.slot?.startTime && booking.slot?.endTime 
                          ? `${booking.slot.startTime} - ${booking.slot.endTime}` 
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "16px" }}>🕐</span>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6c757d" }}>Duration</div>
                      <div style={{ fontSize: "14px", fontWeight: "500", color: "#495057" }}>
                        {booking.service?.duration || 30} min
                      </div>
                    </div>
                  </div>
                </div>

                {booking.status === "pending" && (
                  <div style={{ 
                    marginTop: "16px", 
                    padding: "12px", 
                    backgroundColor: "#fff3cd", 
                    border: "1px solid #ffeaa7", 
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#856404"
                  }}>
                    ℹ️ Your appointment is pending confirmation from the provider.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
