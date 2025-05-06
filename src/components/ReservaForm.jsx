// src/pages/ReservaForm.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './ReservaForm.css';

const ReservaForm = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState('');
  const [cancha, setCancha] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [misReservas, setMisReservas] = useState([]);

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    if (usuarioLogueado) {
      setNombre(usuarioLogueado);
      const turnosGuardados = JSON.parse(localStorage.getItem('turnos')) || [];
      const misTurnos = turnosGuardados.filter(
        t => t.nombre?.toLowerCase() === usuarioLogueado.toLowerCase()
      );
      setMisReservas(misTurnos);
    } else {
      setMisReservas([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !fecha || !hora) {
      setMensaje("Por favor, complete todos los campos.");
      return;
    }

    const nuevoTurno = { nombre, fecha: fecha.toLocaleDateString(), hora, cancha };
    const turnosExistentes = JSON.parse(localStorage.getItem('turnos')) || [];

    const turnoExistente = turnosExistentes.find((turno) =>
      turno.fecha === nuevoTurno.fecha &&
      turno.hora === nuevoTurno.hora &&
      turno.cancha === nuevoTurno.cancha
    );

    if (turnoExistente) {
      setMensaje("Esta hora ya está reservada para la cancha seleccionada.");
    } else {
      turnosExistentes.push(nuevoTurno);
      localStorage.setItem('turnos', JSON.stringify(turnosExistentes));
      setMensaje("Reserva realizada con éxito.");
      setFecha(null);
      setHora('');
      setCancha(1);

      const actualizadas = turnosExistentes.filter(
        t => t.nombre?.toLowerCase() === nombre.toLowerCase()
      );
      setMisReservas(actualizadas);
    }
  };

  return (
    <div className="reserva-container">
      <form onSubmit={handleSubmit} className="reserva-form">
        <h2>Reserva de Turnos</h2>

        <label>Fecha:</label>
        <DatePicker
          selected={fecha}
          onChange={(date) => setFecha(date)}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
        />

        <label>Hora:</label>
        <select value={hora} onChange={(e) => setHora(e.target.value)}>
          <option value="">Seleccione la hora</option>
          {['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00', '22:30', '00:00'].map((horaDisponible) => (
            <option key={horaDisponible} value={horaDisponible}>{horaDisponible}</option>
          ))}
        </select>

        <label>Cancha:</label>
        <select value={cancha} onChange={(e) => setCancha(Number(e.target.value))}>
          <option value={1}>Cancha 1</option>
          <option value={2}>Cancha 2</option>
        </select>

        <button type="submit">Reservar</button>
        {mensaje && <p>{mensaje}</p>}

        {misReservas.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Mis Reservas</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {misReservas.map((reserva, index) => (
                <li key={index}>
                  📅 {reserva.fecha} 🕒 {reserva.hora} - Cancha {reserva.cancha}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
      <div className="logo-container">
        <img src="src/assets/logo.png" alt="Logo" />
      </div>
    </div>
  );
};

export default ReservaForm;
