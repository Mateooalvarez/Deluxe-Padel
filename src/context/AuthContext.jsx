import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [reservas, setReservas] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

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
      if (res.data && res.data.token) {
        setUser({
          name: res.data.name,
          email: res.data.email,
          _id: res.data._id,
          role: res.data.role, // ✅ guardamos el rol del backend
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
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      if (res.data && res.data.token) {
        setUser({
          name: res.data.name,
          email: res.data.email,
          _id: res.data._id,
          role: res.data.role || "usuario", // ✅ rol por defecto "usuario"
          token: res.data.token,
        });
        console.log("✅ Usuario registrado y logueado:", res.data);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error al registrarse:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Ejemplo de enviar token en headers para endpoint protegido
  const reservar = async (cancha, hora, userName) => {
    try {
      if (!user || !user.token) throw new Error("Usuario no autenticado");
      
      const res = await axios.post(
        `${API_URL}/reservas`,
        { cancha, hora, userName },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // <- token para autorizar
          },
        }
      );

      if (res.data) {
        setReservas((prev) => [...prev, res.data]);
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
