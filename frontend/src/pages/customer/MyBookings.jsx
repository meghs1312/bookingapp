import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("/appointments/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>

      {bookings.map(b => (
        <div key={b._id}>
          <p>Service: {b.service?.name}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}
