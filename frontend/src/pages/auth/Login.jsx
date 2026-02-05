import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);

if (res.data.role === "provider")
  navigate("/provider");
else
  navigate("/services");

      // if (res.data.role === "provider") navigate("/provider");
      // else navigate("/services");

    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" />
        <button>Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}
