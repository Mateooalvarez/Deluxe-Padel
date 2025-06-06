import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Necesario para redirección

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [reservas, setReservas] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      if (res.data && res.data.success === true && res.data.token) {
        setUser({
          name: res.data.name,
          email: res.data.email,
          _id: res.data._id,
          role: res.data.role,
          token: res.data.token,
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/register`, { name, email, password });

      if (res.data && res.data.success === true) {
        // Mostrar mensaje opcional (alert, toast, etc.)
        alert("¡Registro exitoso! Ahora iniciá sesión.");
        navigate("/login");
        return { success: true };
      }

      return { success: false, message: res.data.message || "No se pudo registrar el usuario." };
    } catch (err) {
      console.error("Error al registrarse:", err);
      if (err.response && err.response.data && err.response.data.message) {
        return { success: false, message: err.response.data.message };
      }
      return { success: false, message: "No se pudo completar el registro." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const reservar = async (cancha, hora, userName) => {
    try {
      const res = await axios.post(`${API_URL}/reservas`, {
        cancha,
        hora,
        userName,
      });
      if (res.data) {
        setReservas([...reservas, res.data]);
      }
    } catch (err) {
      console.error("Error al reservar:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        reservas,
        login,
        register,
        logout,
        reservar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
