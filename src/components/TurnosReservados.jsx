import React from 'react';

const TurnosReservados = ({turnos}) => {
  return (
    <div className="turnos-reservados">
      <h2>Turnos Reservados</h2>
      <ul>
        {turnos.length === 0 ? (
          <li>No hay turnos reservados.</li>
        ) : (
          turnos.map((turno, index) => (
            <li key={index}>
              <strong>{turno.nombre}</strong> - {turno.fecha} a las {turno.hora}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TurnosReservados;
