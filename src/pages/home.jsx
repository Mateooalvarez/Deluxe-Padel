import React from "react";
import { useAuth } from "../context/AuthContext";
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <header className="hero">
        <div className="hero-content">
          <h1>Deluxe Padel Club</h1>
          <p>Tu lugar para vivir el pádel al máximo</p>
          {user ? (
            <h2 className="bienvenida">¡Bienvenido, {user.name || user.email}!</h2>
          ) : (
            <p className="aviso-login">No estás autenticado. Por favor, inicia sesión.</p>
          )}
        </div>
      </header>

      <section className="resumen">
        <h2>Lo que te espera en Deluxe</h2>
        <div className="resumen-datos">
          <div>
            <h3>🎾 2 Canchas Techadas</h3>
            <p>Disponemos de dos canchas de pádel techadas, con excelente iluminación y piso profesional para garantizar la mejor experiencia de juego. Ya seas principiante o avanzado, nuestras canchas están pensadas para que disfrutes al máximo de cada partido</p>
          </div>
          <div>
            <h3>📅 Turnos Flexibles</h3>
            <p>Reserva tu turno fácilmente: Esta página te permite agendar tu turno para jugar al pádel de forma rápida y cómoda. Solo tenés que seleccionar el horario que más te convenga y confirmar tu reserva. ¡Es rápido y sencillo!</p>
          </div>
          <div>
            <h3>👨‍👩‍👧‍👦 Ambiente Familiar</h3>
            <p>Nuestro club está diseñado para ser un espacio familiar y cómodo, ideal para disfrutar en compañía. Con áreas pensadas para relajarte y socializar, es el lugar perfecto para jugar, entrenar y compartir momentos en familia.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2>¿Por qué elegir Deluxe?</h2>
        <ul>
          <li>🎾 2 canchas de pádel techadas</li>
          <li>📍 Ubicación: Cnel. Lagos 454 9 De Julio, Buenos Aires, Argentina</li>
          <li>🍽️ Servicio de Cantina: Disfrutá de bebidas, comida y snacks mientras juegas</li>
          <li>🎓 Clases de Padel: Aprende y mejora tu técnica con nuestros entrenadores expertos</li>
          <li>🌟 Gran Ambiente: Un lugar amigable y profesional para todos los niveles</li>
        </ul>
      </section>

      <section className="contacto">
        <h2>Contacto</h2>
        <p>📞 WhatsApp:{" "}
          <a href="https://wa.me/5492317460106" target="_blank" rel="noopener noreferrer">
            +54 9 2317 460106
          </a>
        </p>
        <p>📧 Correo:{" "}
          <a href="mailto:deluxepade9dj@gmail.com">
            deluxepade9dj@gmail.com
          </a>
        </p>
        <p>
          📍 Encontranos en:{" "}
          <a href="https://maps.app.goo.gl/jzLoWFsy7QyR8gBq9" target="_blank" rel="noopener noreferrer">
            Cnel. Lagos 454 9 De Julio, Buenos Aires, Argentina
          </a>
        </p>
      </section>

      {user?.role === "dueño" && (
        <section className="panel-duenio">
          <h2>🔒 Panel del Dueño</h2>
          <p>Desde aquí vas a poder acceder al listado completo de reservas, gestionar horarios y consultar estadísticas.</p>
          {/* En el siguiente paso agregamos los botones o enlaces si querés */}
        </section>
      )}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Deluxe Padel Club. Todos los derechos reservados.</p>
        <p>
          Seguinos en{" "}
          <a href="https://www.instagram.com/deluxepadel.9dj?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </p>
        <div className="logo-container">
          <img src="/fondo-padel.jpg" alt="Logo" />
        </div>
      </footer>
    </div>
  );
};

export default Home;
