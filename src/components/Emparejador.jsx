function Emparejador({ jugadores }) {
    const partidos = [];
  
    // Copiamos la lista para no modificar el estado original
    const copia = [...jugadores];
  
    // Mezclamos los jugadores aleatoriamente
    copia.sort(() => Math.random() - 0.5);
  
    // Agrupamos de a 4
    for (let i = 0; i < copia.length; i += 4) {
      const grupo = copia.slice(i, i + 4);
      if (grupo.length === 4) {
        partidos.push(grupo);
      }
    }
  
    return (
      <div>
        <h2>Partidos Emparejados</h2>
        {partidos.length === 0 ? (
          <p>No hay suficientes jugadores para formar partidos (mínimo 4).</p>
        ) : (
          partidos.map((partido, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <strong>Partido {index + 1}:</strong>
              <ul>
                {partido.map((jugador, idx) => (
                  <li key={idx}>{jugador.nombre} - {jugador.categoria}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    );
  }
  
  export default Emparejador;
  