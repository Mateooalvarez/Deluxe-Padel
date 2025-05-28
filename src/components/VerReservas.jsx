// src/components/VerReservas.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // corregido el path si estás usando ../context

const VerReservas = () => {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role === "dueño") {
      axios
        .get("https://backend-deluxe.onrender.com/api/reservas")
        .then((response) => {
          setReservas(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error al cargar las reservas");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return <p>Por favor, inicia sesión para ver las reservas.</p>;
  }

  if (user.role !== "dueño") {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Reservas</h2>
      {reservas.length === 0 ? (
        <p>No hay reservas aún.</p>
      ) : (
        <ul>
          {reservas.map((reserva, index) => (
            <li key={index}>
              <strong>Nombre:</strong> {reserva.nombre} <br />
              <strong>Fecha:</strong> {reserva.fecha} <br />
              <strong>Hora:</strong> {reserva.hora} <br />
              <strong>Cancha:</strong> {reserva.cancha}
            </li>
          ))}
        </ul>
      )}
      <div className="logo-container">
        <img src="/fondo-padel.jpg" alt="Logo" />
      </div>
    </div>
  );
};

export default VerReservas;
