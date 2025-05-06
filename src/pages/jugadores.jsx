import { useState } from 'react';
import JugadorForm from '../components/JugadorForm';
import ListaJugadores from '../components/ListaJugadores';
import Emparejador from '../components/Emparejador';

function Jugadores() {
  const [jugadores, setJugadores] = useState([]);

  const agregarJugador = (nuevo) => {
    setJugadores([...jugadores, nuevo]);
  };

  return (
    <div>
      <h1>Gestión de Jugadores</h1>
      <JugadorForm onAgregar={agregarJugador} />
      <ListaJugadores jugadores={jugadores} />
      <hr />
      <Emparejador jugadores={jugadores} />
    </div>
  );
}

export default Jugadores;
