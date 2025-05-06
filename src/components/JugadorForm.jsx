import { useState } from 'react';

function JugadorForm({ onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('8va');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === '') return;

    // Agregar jugador con categoría seleccionada
    onAgregar({ nombre, categoria });
    setNombre('');
    setCategoria('8va'); // Resetear el formulario después de enviar
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del Jugador:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Categoría:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="8va">8va</option>
          <option value="7ma">7ma</option>
          <option value="6ta">6ta</option>
          <option value="5ta">5ta</option>
          <option value="4ta">4ta</option>
          <option value="3ra">3ra</option>
          <option value="2da">2da</option>
          <option value="1ra">1ra</option>
        </select>
      </div>
      <button type="submit">Agregar Jugador</button>
    </form>
  );
}

export default JugadorForm;
