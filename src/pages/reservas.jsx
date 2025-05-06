import { useState } from 'react';
import ReservaForm from '../components/ReservaForm';
import ListaReservas from '../components/ListaReservas';

function Reservas() {
  const [reservas, setReservas] = useState([]);

  const agregarReserva = (nuevaReserva) => {
    setReservas([...reservas, nuevaReserva]);
  };

  return (
    <div>
      <h1>Reservar una Cancha</h1>
      <ReservaForm onAgregar={agregarReserva} />
      <ListaReservas reservas={reservas} />
    </div>
  );
}

export default Reservas;
