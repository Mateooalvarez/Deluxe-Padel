function ListaJugadores({ jugadores }) {
    return (
      <div>
        <h2>Lista de Jugadores</h2>
        {jugadores.length === 0 ? (
          <p>No hay jugadores registrados.</p>
        ) : (
          <ul>
            {jugadores.map((jugador, index) => (
              <li key={index}>{jugador.nombre} - {jugador.categoria}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  export default ListaJugadores;
  