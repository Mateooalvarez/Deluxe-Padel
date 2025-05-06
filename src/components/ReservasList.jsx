// src/components/ReservasList.jsx
import React from "react";

const ReservasList = ({ reservas }) => {
  return (
    <div className="reservas-list">
      <h2>Reservas realizadas</h2>
      {reservas.length === 0 ? (
        <p>No hay reservas registradas.</p>
      ) : (
        <ul>
          {reservas.map((reserva, index) => (
            <li key={index}>
              <strong>Nombre:</strong> {reserva.nombre} <br />
              <strong>Categoría:</strong> {reserva.categoria} <br />
              <strong>Fecha:</strong> {reserva.fecha} <br />
              <strong>Hora:</strong> {reserva.hora}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservasList;
