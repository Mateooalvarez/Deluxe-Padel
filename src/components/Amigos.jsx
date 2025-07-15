import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Amigos = () => {
  const { user } = useAuth();
  const [amigos, setAmigos] = useState([]);
  const [email, setEmail] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    obtenerAmigos();
    obtenerSolicitudes();
  }, []);

  const obtenerAmigos = async () => {
    try {
      const res = await axios.get(`${API_URL}/friends/${user._id}`);
      setAmigos(res.data);
    } catch (err) {
      console.error('Error al obtener amigos:', err);
    }
  };

  const obtenerSolicitudes = async () => {
    try {
      const res = await axios.get(`${API_URL}/amigos/pendientes/${user._id}`);
      setSolicitudes(res.data);
    } catch (err) {
      console.error('Error al obtener solicitudes:', err);
    }
  };

  const enviarSolicitud = async () => {
    try {
      const resUsuario = await axios.get(`${API_URL}/usuarios/buscar?email=${email}`);
      const destinatario = resUsuario.data;
      await axios.post(`${API_URL}/friends/request`, {
        requesterId: user._id,
        recipientId: destinatario._id,
      });
      alert('Solicitud enviada');
      setEmail('');
    } catch (err) {
      console.error('Error al enviar solicitud:', err);
    }
  };

  const responderSolicitud = async (id, action) => {
    try {
      await axios.post(`${API_URL}/friends/respond`, {
        requestId: id,
        action,
      });
      obtenerSolicitudes();
      obtenerAmigos();
    } catch (err) {
      console.error('Error al responder solicitud:', err);
    }
  };

  return (
    <div className="amigos-container">
      <h2>Amigos</h2>

      <div>
        <input
          type="text"
          placeholder="Buscar por email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={enviarSolicitud}>Enviar solicitud</button>
      </div>

      <h3>Solicitudes pendientes</h3>
      {solicitudes.length === 0 ? (
        <p>No tenés solicitudes pendientes</p>
      ) : (
        solicitudes.map((sol) => (
          <div key={sol._id}>
            <p>De: {sol.requester.name}</p>
            <button onClick={() => responderSolicitud(sol._id, 'accepted')}>Aceptar</button>
            <button onClick={() => responderSolicitud(sol._id, 'rejected')}>Rechazar</button>
          </div>
        ))
      )}

      <h3>Mis amigos</h3>
      {amigos.length === 0 ? (
        <p>No tenés amigos aún</p>
      ) : (
        amigos.map((a) => (
          <div key={a.id}>
            <p>{a.name} - {a.email}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Amigos;
