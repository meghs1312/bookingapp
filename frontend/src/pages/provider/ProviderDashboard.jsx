import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Layout from "../../components/Layout";

export default function ProviderDashboard() {
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [showAddSlot, setShowAddSlot] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });

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

  const tokenHeader = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const fetchServices = async () => {
    const res = await axios.get("/services/my", tokenHeader);
    setServices(res.data);
  };

  const fetchAppointments = async () => {
    const res = await axios.get("/appointments/provider", tokenHeader);
    setAppointments(res.data);
  };

  const fetchSlots = async () => {
    const res = await axios.get("/slots/my", tokenHeader);
    setSlots(res.data);
  };

  const handleSlotSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/slots", slotForm, tokenHeader);

      setSlotForm({
        service: "",
        date: "",
        startTime: "",
        endTime: ""
      });

      setShowAddSlot(false);
      fetchSlots();

      showMessage("success", "Slot created successfully");
    } catch (err) {
      showMessage(
        "error",
        err.response?.data?.message || "Slot already exists for this time"
      );
    }
  };

  const deleteSlot = async (id) => {
    await axios.delete(`/slots/${id}`, tokenHeader);
    fetchSlots();
  };

  const bannerStyle = {
    padding: "12px 18px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontWeight: "600",
    backgroundColor:
      message.type === "success" ? "#e8f5e9" : "#ffebee",
    color: message.type === "success" ? "#2e7d32" : "#d32f2f"
  };

  return (
    <Layout userRole={userRole}>
      <div style={{ padding: "30px" }}>

        {message.text && (
          <div style={bannerStyle}>{message.text}</div>
        )}

        <button onClick={() => setShowAddSlot(true)}>
          ➕ Add Slot
        </button>

        {showAddSlot && (
          <form onSubmit={handleSlotSubmit} style={{ marginTop: "20px" }}>
            <select
              required
              value={slotForm.service}
              onChange={(e) =>
                setSlotForm({ ...slotForm, service: e.target.value })
              }
            >
              <option value="">Select Service</option>
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              required
              value={slotForm.date}
              onChange={(e) =>
                setSlotForm({ ...slotForm, date: e.target.value })
              }
            />

            <input
              type="time"
              required
              value={slotForm.startTime}
              onChange={(e) =>
                setSlotForm({ ...slotForm, startTime: e.target.value })
              }
            />

            <input
              type="time"
              required
              value={slotForm.endTime}
              onChange={(e) =>
                setSlotForm({ ...slotForm, endTime: e.target.value })
              }
            />

            <button type="submit">Save Slot</button>
          </form>
        )}

        <div style={{ marginTop: "30px" }}>
          {slots.map((slot) => {

            // ⭐⭐⭐ THIS IS THE IMPORTANT FIX ⭐⭐⭐
            const service = services.find(
              s => s._id.toString() === slot.service.toString()
            );

            return (
              <div key={slot._id} style={{ marginBottom: "12px" }}>
                <b>{service?.name || "Unknown Service"}</b> |{" "}
                {new Date(slot.date).toLocaleDateString()} |{" "}
                {slot.startTime} - {slot.endTime} |{" "}
                {slot.isBooked ? "Booked" : "Available"}

                {!slot.isBooked && (
                  <button onClick={() => deleteSlot(slot._id)}>
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </Layout>
  );
}
