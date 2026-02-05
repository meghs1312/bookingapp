import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h2>Customer Dashboard</h2>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Link to="/services">
          <button>View Services</button>
        </Link>

        <Link to="/bookings">
          <button>My Bookings</button>
        </Link>
      </div>
    </div>
  );
}
