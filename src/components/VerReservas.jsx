// src/components/VerReservas.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const VerReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cambia esta URL si tu backend está en otro lugar
    axios.get("https://backend-deluxe.onrender.com/api/reservas")
      .then(response => {
        setReservas(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Error al cargar las reservas");
        setLoading(false);
      });
  }, []);

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
    </div>
  );
};

export default VerReservas;
