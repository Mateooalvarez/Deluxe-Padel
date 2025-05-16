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
      actualizarReservas(usuarioLogueado);
    } else {
      setMisReservas([]);
    }
  }, []);

  const actualizarReservas = (usuario) => {
    const turnosGuardados = JSON.parse(localStorage.getItem('turnos')) || [];
    const misTurnos = turnosGuardados.filter(
      t => t.nombre?.toLowerCase() === usuario.toLowerCase()
    );
    setMisReservas(misTurnos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !fecha || !hora) {
      setMensaje("Por favor, complete todos los campos.");
      return;
    }

    const nuevoTurno = { nombre, fecha: fecha.toLocaleDateString(), hora, cancha };
    const turnosExistentes = JSON.parse(localStorage.getItem('turnos')) || [];

    const turnoExistente = turnosExistentes.find(
      (turno) =>
        turno.fecha === nuevoTurno.fecha &&
        turno.hora === nuevoTurno.hora &&
        turno.cancha === nuevoTurno.cancha
    );

    if (turnoExistente) {
      setMensaje("Esta hora ya está reservada para la cancha seleccionada.");
    } else {
      const nuevosTurnos = [...turnosExistentes, nuevoTurno];
      localStorage.setItem('turnos', JSON.stringify(nuevosTurnos));
      setMensaje("Reserva realizada con éxito.");
      setFecha(null);
      setHora('');
      setCancha(1);
      actualizarReservas(nombre);
    }
  };

  const handleCancelarReserva = (reservaCancelada) => {
    // Mostrar confirmación antes de proceder con la cancelación
    const confirmacion = window.confirm('¿Estás seguro de que deseas cancelar esta reserva?');

    if (confirmacion) {
      const turnosGuardados = JSON.parse(localStorage.getItem('turnos')) || [];
      const actualizados = turnosGuardados.filter(
        (t) =>
          !(
            t.nombre === reservaCancelada.nombre &&
            t.fecha === reservaCancelada.fecha &&
            t.hora === reservaCancelada.hora &&
            t.cancha === reservaCancelada.cancha
          )
      );
      localStorage.setItem('turnos', JSON.stringify(actualizados));
      actualizarReservas(nombre);
      setMensaje("Reserva cancelada correctamente.");
    } else {
      setMensaje("Cancelación de reserva cancelada.");
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
                <li key={index} style={{ marginBottom: '10px' }}>
                  📅 {reserva.fecha} 🕒 {reserva.hora} - Cancha {reserva.cancha}{" "}
                  <button
                    onClick={() => handleCancelarReserva(reserva)}
                    style={{
                      marginLeft: '10px',
                      backgroundColor: '#e30613',
                      color: '#fff',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default ReservaForm;