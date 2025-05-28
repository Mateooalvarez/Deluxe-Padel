import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css"; // Asegúrate de importar los estilos

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <nav>
        <ul>
          <li className="logo">
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/reservar">Reservar Turno</Link>
          </li>
          {/* Nuevo botón para ver reservas */}
          <li>
            <Link to="/ver-reservas">Ver Reservas</Link>
          </li>
          {user ? (
            <li>
              <button onClick={logout}>Cerrar sesión</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
