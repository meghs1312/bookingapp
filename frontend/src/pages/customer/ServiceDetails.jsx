import { useParams } from "react-router-dom";

export default function ServiceDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Service Details</h2>
      <p>Service ID: {id}</p>
      <button>Book Appointment</button>
    </div>
  );
}
