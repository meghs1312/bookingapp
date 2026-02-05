import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Layout from "../../components/Layout";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [selectedNewSlot, setSelectedNewSlot] = useState("");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/appointments/my", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlotsForService = async (serviceId) => {
    try {
      const res = await axios.get(`/slots?service=${serviceId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setAvailableSlots(res.data);
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      await axios.delete(`/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Appointment cancelled successfully");
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || "Error cancelling appointment");
    }
  };

  const handleRescheduleClick = async (appointment) => {
    setRescheduleId(appointment._id);
    setSelectedNewSlot("");
    await fetchAvailableSlotsForService(appointment.service._id);
  };

  const handleRescheduleSubmit = async (appointmentId) => {
    if (!selectedNewSlot) {
      alert("Please select a new time slot");
      return;
    }

    try {
      await axios.patch(
        `/appointments/${appointmentId}/reschedule`,
        { newSlotId: selectedNewSlot },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      alert("Appointment rescheduled successfully");
      setRescheduleId(null);
      setSelectedNewSlot("");
      setAvailableSlots([]);
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || "Error rescheduling appointment");
    }
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto"
    },
    header: {
      marginBottom: "30px"
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#495057",
      margin: "0 0 10px 0"
    },
    subtitle: {
      fontSize: "16px",
      color: "#6c757d",
      margin: 0
    },
    emptyState: {
      textAlign: "center",
      padding: "80px 20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "12px",
      border: "2px dashed #dee2e6"
    },
    appointmentCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "25px",
      marginBottom: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "2px solid #e9ecef"
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "20px"
    },
    serviceName: {
      fontSize: "22px",
      fontWeight: "600",
      color: "#495057",
      margin: "0 0 10px 0"
    },
    statusBadge: {
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "600",
      textTransform: "uppercase"
    },
    detailsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
      marginBottom: "20px"
    },
    detailItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#6c757d",
      fontSize: "15px"
    },
    buttonGroup: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap"
    },
    button: {
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease"
    },
    rescheduleSection: {
      marginTop: "20px",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      border: "2px solid #e9ecef"
    },
    slotGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "12px",
      marginTop: "15px"
    },
    slotCard: {
      padding: "12px",
      borderRadius: "8px",
      border: "2px solid #e9ecef",
      backgroundColor: "white",
      cursor: "pointer",
      transition: "all 0.2s ease"
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return { backgroundColor: "#e8f5e9", color: "#2e7d32" };
      case "cancelled":
        return { backgroundColor: "#ffebee", color: "#d32f2f" };
      case "pending":
        return { backgroundColor: "#fff3e0", color: "#e65100" };
      default:
        return { backgroundColor: "#e9ecef", color: "#6c757d" };
    }
  };

  if (loading) {
    return (
      <Layout userRole={userRole}>
        <div style={{ textAlign: "center", padding: "60px" }}>
          <p style={{ fontSize: "18px", color: "#6c757d" }}>Loading appointments...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout userRole={userRole}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Appointments</h1>
          <p style={styles.subtitle}>View and manage your healthcare appointments</p>
        </div>

        {appointments.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>📅</div>
            <h2 style={{ color: "#495057", marginBottom: "10px" }}>No Appointments Yet</h2>
            <p style={{ color: "#6c757d", fontSize: "16px" }}>
              Book your first appointment to get started
            </p>
          </div>
        ) : (
          <div>
            {appointments.map((appointment) => (
              <div key={appointment._id} style={styles.appointmentCard}>
                <div style={styles.cardHeader}>
                  <div>
                    <h3 style={styles.serviceName}>
                      🏥 {appointment.service?.name || "Unknown Service"}
                    </h3>
                    <p style={{ color: "#6c757d", margin: 0 }}>
                      Provider: {appointment.provider?.name || "Unknown"}
                    </p>
                  </div>
                  <div style={{ ...styles.statusBadge, ...getStatusColor(appointment.status) }}>
                    {appointment.status}
                  </div>
                </div>

                <div style={styles.detailsGrid}>
                  <div style={styles.detailItem}>
                    <span>📅</span>
                    <span>
                      {appointment.slot?.date
                        ? new Date(appointment.slot.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })
                        : "N/A"}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span>🕐</span>
                    <span>
                      {appointment.slot?.startTime} - {appointment.slot?.endTime}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span>⏱️</span>
                    <span>{appointment.service?.duration || 0} minutes</span>
                  </div>
                </div>

                {appointment.status !== "cancelled" && (
                  <div style={styles.buttonGroup}>
                    <button
                      onClick={() => handleRescheduleClick(appointment)}
                      style={{
                        ...styles.button,
                        backgroundColor: "#6c7ae0",
                        color: "white"
                      }}
                    >
                      🔄 Reschedule
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appointment._id)}
                      style={{
                        ...styles.button,
                        backgroundColor: "#ffebee",
                        color: "#d32f2f",
                        border: "2px solid #ffcdd2"
                      }}
                    >
                      ❌ Cancel Appointment
                    </button>
                  </div>
                )}

                {rescheduleId === appointment._id && (
                  <div style={styles.rescheduleSection}>
                    <h4 style={{ margin: "0 0 15px 0", color: "#495057" }}>
                      Select a New Time Slot
                    </h4>
                    {availableSlots.length === 0 ? (
                      <p style={{ color: "#6c757d", margin: 0 }}>
                        No available slots for this service
                      </p>
                    ) : (
                      <>
                        <div style={styles.slotGrid}>
                          {availableSlots.map((slot) => (
                            <div
                              key={slot._id}
                              onClick={() => setSelectedNewSlot(slot._id)}
                              style={{
                                ...styles.slotCard,
                                borderColor: selectedNewSlot === slot._id ? "#6c7ae0" : "#e9ecef",
                                backgroundColor: selectedNewSlot === slot._id ? "#f0f2ff" : "white"
                              }}
                            >
                              <div style={{ fontSize: "14px", fontWeight: "600", color: "#495057" }}>
                                {new Date(slot.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric"
                                })}
                              </div>
                              <div style={{ fontSize: "13px", color: "#6c757d", marginTop: "4px" }}>
                                {slot.startTime} - {slot.endTime}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                          <button
                            onClick={() => handleRescheduleSubmit(appointment._id)}
                            style={{
                              ...styles.button,
                              backgroundColor: "#4caf50",
                              color: "white"
                            }}
                          >
                            Confirm Reschedule
                          </button>
                          <button
                            onClick={() => {
                              setRescheduleId(null);
                              setSelectedNewSlot("");
                              setAvailableSlots([]);
                            }}
                            style={{
                              ...styles.button,
                              backgroundColor: "transparent",
                              color: "#6c757d",
                              border: "2px solid #e9ecef"
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
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
