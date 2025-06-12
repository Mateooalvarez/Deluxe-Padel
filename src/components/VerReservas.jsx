import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./VerReservas.css";  // archivo CSS externo

const VerReservas = () => {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user?.role === "dueño") {
      obtenerReservas();
    }
  }, [user]);

  const obtenerReservas = async () => {
    try {
      const res = await axios.get(`${API_URL}/reservas`);
      setReservas(res.data);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
    }
  };

  const eliminarReserva = async (id) => {
    try {
      await axios.delete(`${API_URL}/reservas/${id}`);
      setReservas(reservas.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error al eliminar la reserva:", err);
    }
  };

  if (!user || user.role !== "dueño") {
    return <p className="error-msg">No tenés permiso para ver esta sección.</p>;
  }

  return (
    <div className="ver-reservas-container">
      <h2>Reservas registradas</h2>
      {reservas.length === 0 ? (
        <p className="no-reservas-msg">No hay reservas disponibles.</p>
      ) : (
        <table className="reservas-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Cancha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r) => (
              <tr key={r._id}>
                <td>{r.nombre}</td>
                <td>{r.fecha}</td>
                <td>{r.hora}</td>
                <td>{r.cancha}</td>
                <td>{r.estado || "Pendiente"}</td>
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarReserva(r._id)}
                    title="Eliminar reserva"
                  >
                    ❌ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VerReservas;
