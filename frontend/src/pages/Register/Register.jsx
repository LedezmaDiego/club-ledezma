import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      // Guardar en localStorage
      localStorage.setItem("full_name", form.fullName);
      localStorage.setItem("email", form.email);

      // REDIRIGIR A HOME
      navigate("/");
      window.location.reload();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>

      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Nombre completo
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>

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
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
