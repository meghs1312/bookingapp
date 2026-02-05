import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Layout from "../../components/Layout";

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    duration: 30
  });
  const [slotForm, setSlotForm] = useState({
    service: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetchServices();
    fetchAppointments();
    fetchSlots();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/services/my", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/appointments/provider", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const fetchSlots = async () => {
    try {
      const res = await axios.get("/slots/my", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setSlots(res.data);
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/services", serviceForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setServiceForm({ name: "", description: "", duration: 30 });
      setShowAddService(false);
      fetchServices();
    } catch (err) {
      console.error("Error creating service:", err);
    }
  };

  const handleAppointmentUpdate = async (appointmentId, status) => {
    try {
      await axios.patch(
        `/appointments/${appointmentId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      fetchAppointments();
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  const handleSlotSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/slots", slotForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setSlotForm({ service: "", date: "", startTime: "", endTime: "" });
      setShowAddSlot(false);
      fetchSlots();
    } catch (err) {
      console.error("Error creating slot:", err);
    }
  };

  const deleteService = async (serviceId) => {
    try {
      await axios.delete(`/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  const deleteSlot = async (slotId) => {
    try {
      await axios.delete(`/slots/${slotId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchSlots();
    } catch (err) {
      console.error("Error deleting slot:", err);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "25px"
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px"
    },
    statCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "25px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #e9ecef"
    },
    statContent: {
      display: "flex",
      alignItems: "center",
      gap: "15px"
    },
    statIcon: {
      borderRadius: "12px",
      padding: "15px",
      fontSize: "24px"
    },
    statTitle: {
      margin: 0,
      color: "#495057",
      fontSize: "18px"
    },
    statValue: {
      margin: "5px 0 0 0",
      fontSize: "28px",
      fontWeight: "bold"
    },
    tabContainer: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      border: "1px solid #e9ecef"
    },
    tabButtons: {
      display: "flex",
      gap: "4px"
    },
    contentCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "30px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #e9ecef"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px"
    },
    headerTitle: {
      margin: 0,
      color: "#495057",
      fontSize: "24px"
    },
    headerSubtitle: {
      margin: "5px 0 0 0",
      color: "#6c757d"
    },
    primaryButton: {
      backgroundColor: "#6c7ae0",
      color: "white",
      border: "none",
      borderRadius: "10px",
      padding: "12px 24px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      boxShadow: "0 2px 8px rgba(108, 122, 224, 0.3)",
      transition: "all 0.2s ease"
    },
    formContainer: {
      backgroundColor: "#f8f9fa",
      border: "2px solid #e9ecef",
      borderRadius: "12px",
      padding: "25px",
      marginBottom: "25px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    },
    formTitle: {
      color: "#495057",
      marginBottom: "20px",
      fontSize: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#495057",
      fontSize: "14px",
      fontWeight: "600"
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      border: "2px solid #e9ecef",
      borderRadius: "8px",
      fontSize: "16px",
      outline: "none",
      transition: "border-color 0.2s ease"
    },
    textarea: {
      width: "100%",
      padding: "12px 16px",
      border: "2px solid #e9ecef",
      borderRadius: "8px",
      fontSize: "16px",
      outline: "none",
      transition: "border-color 0.2s ease",
      resize: "vertical"
    },
    buttonGroup: {
      display: "flex",
      gap: "12px",
      paddingTop: "10px"
    },
    submitButton: {
      flex: 1,
      backgroundColor: "#6c7ae0",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "14px 24px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.2s ease"
    },
    cancelButton: {
      flex: 1,
      backgroundColor: "transparent",
      color: "#6c757d",
      border: "2px solid #e9ecef",
      borderRadius: "8px",
      padding: "14px 24px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease"
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "12px",
      border: "2px dashed #dee2e6"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "20px"
    },
    card: {
      backgroundColor: "#ffffff",
      border: "2px solid #e9ecef",
      borderRadius: "12px",
      padding: "25px",
      transition: "all 0.2s ease",
      position: "relative",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    }
  };

  return (
    <Layout userRole={userRole}>
      <div style={styles.container}>
        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div style={{ ...styles.statIcon, backgroundColor: "#e3f2fd" }}>🏥</div>
              <div>
                <h3 style={styles.statTitle}>Total Services</h3>
                <p style={{ ...styles.statValue, color: "#2196f3" }}>{services.length}</p>
              </div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div style={{ ...styles.statIcon, backgroundColor: "#f3e5f5" }}>📅</div>
              <div>
                <h3 style={styles.statTitle}>Available Slots</h3>
                <p style={{ ...styles.statValue, color: "#9c27b0" }}>
                  {slots.filter(s => !s.isBooked).length}
                </p>
              </div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div style={{ ...styles.statIcon, backgroundColor: "#fff3e0" }}>⏳</div>
              <div>
                <h3 style={styles.statTitle}>Pending Requests</h3>
                <p style={{ ...styles.statValue, color: "#ff9800" }}>
                  {appointments.filter(a => a.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          <div style={styles.tabButtons}>
            {[
              { key: "services", label: "My Services", icon: "🏥" },
              { key: "slots", label: "Time Slots", icon: "📅" },
              { key: "appointments", label: "Appointments", icon: "👥" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1,
                  backgroundColor: activeTab === tab.key ? "#6c7ae0" : "transparent",
                  color: activeTab === tab.key ? "white" : "#6c757d",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Tab */}
        {activeTab === "services" && (
          <div style={styles.contentCard}>
            <div style={styles.header}>
              <div>
                <h2 style={styles.headerTitle}>My Services</h2>
                <p style={styles.headerSubtitle}>Manage your healthcare services</p>
              </div>
              <button onClick={() => setShowAddService(true)} style={styles.primaryButton}>
                <span>+</span>
                <span>Add New Service</span>
              </button>
            </div>

            {showAddService && (
              <div style={styles.formContainer}>
                <h3 style={styles.formTitle}>
                  <span>🏥</span>
                  <span>Add New Service</span>
                </h3>
                <form onSubmit={handleServiceSubmit} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Service Name</label>
                    <input
                      type="text"
                      value={serviceForm.name}
                      onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                      required
                      placeholder="Enter service name"
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                      placeholder="Describe your service"
                      rows="4"
                      style={styles.textarea}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Duration (minutes)</label>
                    <input
                      type="number"
                      value={serviceForm.duration}
                      onChange={(e) => setServiceForm({...serviceForm, duration: parseInt(e.target.value)})}
                      required
                      min="15"
                      max="480"
                      placeholder="30"
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.submitButton}>Save Service</button>
                    <button type="button" onClick={() => setShowAddService(false)} style={styles.cancelButton}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {services.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏥</div>
                <h3 style={{ color: "#6c757d", marginBottom: "8px" }}>No Services Yet</h3>
                <p style={{ color: "#6c757d", margin: 0 }}>Create your first healthcare service to get started</p>
              </div>
            ) : (
              <div style={styles.grid}>
                {services.map((service) => (
                  <div key={service._id} style={styles.card}>
                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ margin: "0 0 10px 0", color: "#495057", fontSize: "20px", fontWeight: "600" }}>
                        🏥 {service.name}
                      </h4>
                      <p style={{ color: "#6c757d", margin: "0 0 15px 0", lineHeight: "1.5" }}>
                        {service.description || "No description provided"}
                      </p>
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "600"
                      }}>
                        🕐 {service.duration} minutes
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteService(service._id)}
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        backgroundColor: "#ffebee",
                        color: "#d32f2f",
                        border: "2px solid #ffcdd2",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600"
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Slots Tab */}
        {activeTab === "slots" && (
          <div style={styles.contentCard}>
            <div style={styles.header}>
              <div>
                <h2 style={styles.headerTitle}>Time Slots</h2>
                <p style={styles.headerSubtitle}>Manage your available appointment slots</p>
              </div>
              <button onClick={() => setShowAddSlot(true)} style={styles.primaryButton}>
                <span>+</span>
                <span>Add Time Slot</span>
              </button>
            </div>

            {showAddSlot && (
              <div style={styles.formContainer}>
                <h3 style={styles.formTitle}>
                  <span>📅</span>
                  <span>Add New Time Slot</span>
                </h3>
                <form onSubmit={handleSlotSubmit} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Service</label>
                    <select
                      value={slotForm.service}
                      onChange={(e) => setSlotForm({...slotForm, service: e.target.value})}
                      required
                      style={styles.input}
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service._id} value={service._id}>{service.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Date</label>
                    <input
                      type="date"
                      value={slotForm.date}
                      onChange={(e) => setSlotForm({...slotForm, date: e.target.value})}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      style={styles.input}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Start Time</label>
                      <input
                        type="time"
                        value={slotForm.startTime}
                        onChange={(e) => setSlotForm({...slotForm, startTime: e.target.value})}
                        required
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>End Time</label>
                      <input
                        type="time"
                        value={slotForm.endTime}
                        onChange={(e) => setSlotForm({...slotForm, endTime: e.target.value})}
                        required
                        style={styles.input}
                      />
                    </div>
                  </div>
                  <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.submitButton}>Save Slot</button>
                    <button type="button" onClick={() => setShowAddSlot(false)} style={styles.cancelButton}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {slots.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📅</div>
                <h3 style={{ color: "#6c757d", marginBottom: "8px" }}>No Time Slots Yet</h3>
                <p style={{ color: "#6c757d", margin: 0 }}>Create your first time slot to accept bookings</p>
              </div>
            ) : (
              <div style={styles.grid}>
                {slots.map((slot) => {
                  const service = services.find(s => s._id === slot.service);
                  return (
                    <div key={slot._id} style={{
                      ...styles.card,
                      backgroundColor: slot.isBooked ? "#fff3e0" : "#e8f5e9"
                    }}>
                      <div style={{ marginBottom: "15px" }}>
                        <h4 style={{ margin: "0 0 10px 0", color: "#495057", fontSize: "18px", fontWeight: "600" }}>
                          {service?.name || "Unknown Service"}
                        </h4>
                        <p style={{ margin: "5px 0", fontSize: "14px", color: "#6c757d" }}>
                          📅 {new Date(slot.date).toLocaleDateString()}
                        </p>
                        <p style={{ margin: "5px 0", fontSize: "14px", color: "#6c757d" }}>
                          🕐 {slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: slot.isBooked ? "#e65100" : "#2e7d32"
                        }}>
                          {slot.isBooked ? "🔴 Booked" : "🟢 Available"}
                        </span>
                        {!slot.isBooked && (
                          <button 
                            onClick={() => deleteSlot(slot._id)}
                            style={{
                              backgroundColor: "#ffebee",
                              color: "#d32f2f",
                              border: "2px solid #ffcdd2",
                              borderRadius: "8px",
                              padding: "6px 12px",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: "600"
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div style={styles.contentCard}>
            <div style={styles.header}>
              <div>
                <h2 style={styles.headerTitle}>Appointment Requests</h2>
                <p style={styles.headerSubtitle}>Manage customer appointment requests</p>
              </div>
            </div>

            {appointments.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>👥</div>
                <h3 style={{ color: "#6c757d", marginBottom: "8px" }}>No Appointments Yet</h3>
                <p style={{ color: "#6c757d", margin: 0 }}>Appointment requests will appear here</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {appointments.map((appointment) => (
                  <div key={appointment._id} style={{
                    border: "2px solid #e9ecef",
                    borderRadius: "12px",
                    padding: "20px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: "0 0 10px 0", color: "#495057", fontSize: "18px" }}>
                          {appointment.service?.name}
                        </h4>
                        <p style={{ margin: "5px 0", color: "#6c757d" }}>
                          👤 Patient: {appointment.customer?.name}
                        </p>
                        <p style={{ margin: "5px 0", color: "#6c757d" }}>
                          📅 {new Date(appointment.slot?.date).toLocaleDateString()}
                        </p>
                        <p style={{ margin: "5px 0", color: "#6c757d" }}>
                          🕐 {appointment.slot?.startTime} - {appointment.slot?.endTime}
                        </p>
                        <div style={{
                          display: "inline-block",
                          marginTop: "10px",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: "600",
                          backgroundColor: 
                            appointment.status === "confirmed" ? "#e8f5e9" :
                            appointment.status === "cancelled" ? "#ffebee" : "#fff3e0",
                          color:
                            appointment.status === "confirmed" ? "#2e7d32" :
                            appointment.status === "cancelled" ? "#d32f2f" : "#e65100"
                        }}>
                          {appointment.status.toUpperCase()}
                        </div>
                      </div>
                      {appointment.status === "pending" && (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            onClick={() => handleAppointmentUpdate(appointment._id, "confirmed")}
                            style={{
                              backgroundColor: "#4caf50",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              padding: "10px 20px",
                              cursor: "pointer",
                              fontWeight: "600"
                            }}
                          >
                            ✓ Accept
                          </button>
                          <button
                            onClick={() => handleAppointmentUpdate(appointment._id, "cancelled")}
                            style={{
                              backgroundColor: "#f44336",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              padding: "10px 20px",
                              cursor: "pointer",
                              fontWeight: "600"
                            }}
                          >
                            ✗ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
