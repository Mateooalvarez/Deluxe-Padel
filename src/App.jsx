// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import ReservaForm from "./components/ReservaForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/header"; 
import { useAuth } from "./context/AuthContext";
import VerReservas from "./components/VerReservas"; // ✅ Importamos el componente

function App() {
  const { user } = useAuth(); // Verifica si el usuario está autenticado

  return (
    <Router>
      {/* Mostrar el Header solo si el usuario está autenticado */}
      {user && <Header />}

      <Routes>
        {/* Ruta Home, redirige a login si no hay usuario autenticado */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        
        {/* Ruta ReservaForm, redirige a login si no hay usuario autenticado */}
        <Route path="/reservar" element={user ? <ReservaForm /> : <Navigate to="/login" />} />
        
        {/* Ruta Login, siempre disponible */}
        <Route path="/login" element={<Login />} />

        {/* Ruta Register, para crear una cuenta */}
        <Route path="/register" element={<Register />} />

        {/* ✅ Nueva ruta para ver reservas */}
        <Route path="/ver-reservas" element={user ? <VerReservas /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
