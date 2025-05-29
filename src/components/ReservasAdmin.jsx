import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ReservasAdmin = () => {
  const { user } = useAuth();
  const [todasLasReservas, setTodasLasReservas] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await axios.get(`${API_URL}/reservas`);
        setTodasLasReservas(res.data);
      } catch (err) {
        console.error("Error al traer reservas:", err);
      }
    };

    if (user?.role === "dueño") {
      fetchReservas();
    }
  }, [user]);

  if (user?.role !== "dueño") return null;

  return (
    <div>
      <h2>📋 Reservas del Día (Panel del Dueño)</h2>
      {todasLasReservas.length === 0 ? (
        <p>No hay reservas registradas.</p>
      ) : (
        <ul>
          {todasLasReservas.map((reserva) => (
            <li key={reserva._id}>
              <strong>Cancha:</strong> {reserva.cancha} - 
              <strong> Hora:</strong> {reserva.hora} - 
              <strong> Usuario:</strong> {reserva.userName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservasAdmin;
