import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Layout from "../../components/Layout";

export default function BookAppointment() {
  const { id } = useParams(); // service id
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetchServiceAndSlots();
  }, [id]);

  const fetchServiceAndSlots = async () => {
    try {
      // Fetch service details
      const serviceRes = await axios.get(`/services`);
      const currentService = serviceRes.data.find(s => s._id === id);
      setService(currentService);

      // Fetch available slots
      const slotsRes = await axios.get(`/slots/${id}`);
      setSlots(slotsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const bookSlot = async (slotId) => {
    setIsBooking(true);
    try {
      await axios.post(
        "/appointments",
        { slotId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      // Show success message and navigate
      alert("Appointment booked successfully! Redirecting to your appointments...");
      navigate("/bookings");
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const groupSlotsByDate = (slots) => {
    const grouped = {};
    slots.forEach(slot => {
      const date = new Date(slot.date).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(slot);
    });
    return grouped;
  };

  const filteredSlots = selectedDate 
    ? slots.filter(slot => new Date(slot.date).toDateString() === new Date(selectedDate).toDateString())
    : slots;

  const groupedSlots = groupSlotsByDate(filteredSlots);

  if (loading) {
    return (
      <Layout userRole={userRole}>
        <div style={{ textAlign: "center", padding: "60px" }}>
          <div style={{ fontSize: "24px", marginBottom: "16px" }}>⏳</div>
          <p>Loading available appointments...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout userRole={userRole}>
      <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
            <button 
              onClick={() => navigate("/services")}
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                padding: "5px"
              }}
            >
              ←
            </button>
            <div>
              <h2 style={{ color: "#495057", marginBottom: "5px", fontSize: "28px" }}>Book Appointment</h2>
              {service && (
                <p style={{ color: "#6c757d", margin: 0, fontSize: "16px" }}>
                  {service.name} • {service.duration || 30} minutes
                </p>
              )}
            </div>
          </div>
          
          {service?.description && (
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #e9ecef"
            }}>
              <p style={{ margin: 0, color: "#6c757d", lineHeight: "1.5" }}>{service.description}</p>
            </div>
          )}
        </div>

        {/* Date Filter */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            color: "#495057", 
            fontSize: "16px",
            fontWeight: "600"
          }}>Filter by Date:</label>
          <input 
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            style={{
              padding: "10px 15px",
              border: "2px solid #e9ecef",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "#6c7ae0"}
            onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
          />
          {selectedDate && (
            <button
              onClick={() => setSelectedDate("")}
              style={{
                marginLeft: "10px",
                padding: "10px 15px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Available Slots */}
        <div>
          <h3 style={{ color: "#495057", marginBottom: "20px", fontSize: "20px" }}>Available Time Slots</h3>
          
          {Object.keys(groupedSlots).length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#6c757d" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📅</div>
              <h4 style={{ marginBottom: "8px" }}>No Available Slots</h4>
              <p>There are no available appointments for this service at the moment.</p>
              <button 
                onClick={() => navigate("/services")}
                style={{
                  backgroundColor: "#6c7ae0",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "15px"
                }}
              >
                Back to Services
              </button>
            </div>
          ) : (
            Object.entries(groupedSlots).map(([date, dateSlots]) => (
              <div key={date} style={{ marginBottom: "30px" }}>
                <h4 style={{ 
                  color: "#495057", 
                  marginBottom: "15px", 
                  fontSize: "18px",
                  borderBottom: "2px solid #e9ecef",
                  paddingBottom: "8px"
                }}>
                  📅 {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h4>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "15px"
                }}>
                  {dateSlots.map((slot) => (
                    <div key={slot._id} style={{
                      border: "2px solid #e9ecef",
                      borderRadius: "12px",
                      padding: "20px",
                      backgroundColor: "#f8f9fa",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#6c7ae0";
                      e.currentTarget.style.backgroundColor = "#f0f4ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e9ecef";
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                    }}>
                      <div style={{ marginBottom: "12px" }}>
                        <div style={{ fontSize: "18px", fontWeight: "600", color: "#495057" }}>
                          🕐 {slot.startTime} - {slot.endTime}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => bookSlot(slot._id)}
                        disabled={isBooking}
                        style={{
                          width: "100%",
                          backgroundColor: isBooking ? "#adb5bd" : "#6c7ae0",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "10px 16px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: isBooking ? "not-allowed" : "pointer",
                          transition: "background-color 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                          if (!isBooking) e.target.style.backgroundColor = "#5a6fd8";
                        }}
                        onMouseLeave={(e) => {
                          if (!isBooking) e.target.style.backgroundColor = "#6c7ae0";
                        }}
                      >
                        {isBooking ? "Booking..." : "Book Now"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
