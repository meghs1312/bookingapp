import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/services").then(res => setServices(res.data));
  }, []);

  return (
    <div>
      <h2>Available Services</h2>

      {services.map((service) => (
        <div key={service._id} style={{border:"1px solid gray", padding:10, margin:10}}>
          <h3>{service.name}</h3>
          <p>{service.description}</p>

          {/* ⭐ CHANGE IS HERE */}
          <button onClick={() => navigate(`/book/${service._id}`)}>
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}
