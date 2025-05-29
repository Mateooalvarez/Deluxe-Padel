import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const ReservasAdmin = () => {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user?.role === "dueño") {
      axios
        .get(`${API_URL}/reservas`)
        .then((res) => setReservas(res.data))
        .catch((err) => console.error("Error al cargar reservas:", err));
    }
  }, [user]);

  if (!user || user.role !== "dueño") {
    return <p>No tenés permisos para ver esta sección.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Reservas registradas</h2>
      {reservas.length === 0 ? (
        <p>No hay reservas cargadas.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Cancha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r) => (
              <tr key={r._id /* ojo que Mongo usa _id, no id */}>
                <td>{r.nombre}</td>
                <td>{r.fecha}</td>
                <td>{r.hora}</td>
                <td>{r.cancha}</td>
                <td>{r.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservasAdmin;
