import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  await axios.post("/auth/register", form);
  navigate("/login");
} catch (err) {
  console.log(err.response.data);   // ⭐ add this
}

    navigate("/login");
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" onChange={handleChange} placeholder="Name" />
        <input name="email" onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" />
        <select name="role" onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
        </select>
        <button>Register</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}
