// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error);
      } else {
        localStorage.setItem("full_name", data.full_name);
        localStorage.setItem("email", data.email);

        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setMessage(error, "Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn-submit">
          Entrar
        </button>
      </form>

      {message && <p className="login-message">{message}</p>}
    </div>
  );
}
