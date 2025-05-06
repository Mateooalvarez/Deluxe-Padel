import React, { useState, useEffect } from 'react';
import TurnosReservados from '../components/TurnosReservados';

const TurnosPage = () => {
  const [turnos, setTurnos] = useState([]);

  // Cargar turnos simulados al inicio
  useEffect(() => {
    const storedTurnos = JSON.parse(localStorage.getItem('turnos')) || [];
    setTurnos(storedTurnos);
  }, []);

  return (
    <div>
      <h1>Gestión de Turnos</h1>
      <TurnosReservados turnos={turnos} />
    </div>
  );
};

export default TurnosPage;
