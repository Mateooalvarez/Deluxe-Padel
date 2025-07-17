import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './ReservaForm.css';

const API_URL = import.meta.env.VITE_API_URL;

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
    }
  }, []);

  const actualizarReservas = async (usuario) => {
    try {
      const response = await axios.get(`${API_URL}/reservas/usuario/${usuario}`);
      setMisReservas(response.data);
    } catch (error) {
      console.error("Error al obtener reservas", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !fecha || !hora || !cancha) {
      setMensaje("Por favor, complete todos los campos.");
      return;
    }

    try {
      const reserva = {
        nombre,
        fecha: fecha.toLocaleDateString('es-AR'),
        hora,
        cancha,
      };

      const res = await axios.post(`${API_URL}/reservas`, reserva);
      setMensaje(res.data.mensaje);
      setFecha(null);
      setHora('');
      setCancha(1);
      actualizarReservas(nombre);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMensaje("Esta hora ya está reservada para la cancha seleccionada.");
      } else {
        setMensaje("Error al crear la reserva.");
      }
    }
  };

  const handleCancelarReserva = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que querés cancelar esta reserva?');
    if (confirmacion) {
      try {
        await axios.delete(`${API_URL}/reservas/${id}`);
        actualizarReservas(nombre);
        setMensaje("Reserva cancelada correctamente.");
      } catch (error) {
        setMensaje("Error al cancelar la reserva.");
      }
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
              {misReservas.map((reserva) => (
                <li key={reserva._id} style={{ marginBottom: '10px' }}>
                  📅 {reserva.fecha} 🕒 {reserva.hora} - Cancha {reserva.cancha}{" "}
                  <button
                    onClick={() => handleCancelarReserva(reserva._id)}
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
      <div className="logo-container">
        <img src="/fondo-padel.jpg" alt="Logo" />
      </div>
    </div>
  );
};

export default ReservaForm;