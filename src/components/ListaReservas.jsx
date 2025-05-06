function ListaReservas({ reservas }) {
    return (
      <div>
        <h2>Reservas</h2>
        {reservas.length === 0 ? (
          <p>No hay reservas aún.</p>
        ) : (
          <ul>
            {reservas.map((reserva, index) => (
              <li key={index}>
                {reserva.nombre} - {reserva.fecha.toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  export default ListaReservas;
  