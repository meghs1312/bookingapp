import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

export default function BookAppointment() {
  const { id } = useParams(); // service id
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    const res = await axios.get(`/slots/${id}`);
    setSlots(res.data);
  };

  const bookSlot = async (slotId) => {
    await axios.post(
      "/appointments",
      { slotId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    alert("Appointment booked!");
  };

  return (
    <div>
      <h2>Select Slot</h2>

      {slots.length === 0 && <p>No slots available</p>}

      {slots.map((slot) => (
        <button
          key={slot._id}
          onClick={() => bookSlot(slot._id)}
          style={{ margin: 10 }}
        >
          {new Date(slot.startTime).toLocaleString()}
        </button>
      ))}
    </div>
  );
}
