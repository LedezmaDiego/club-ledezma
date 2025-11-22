import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("full_name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Redirige al home después de cerrar
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Club Ledezma</h2>

      <div className="nav-links">
        {!fullName ? (
          <>
            <Link to="/register" className="register-btn">
              Registrarse
            </Link>
            <Link to="/login" className="login-btn">
              Iniciar Sesión
            </Link>
          </>
        ) : (
          <>
            <span className="user-name">Hola, {fullName}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
