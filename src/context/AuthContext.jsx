// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [reservas, setReservas] = useState(() => {
    const storedReservas = localStorage.getItem("reservas");
    return storedReservas ? JSON.parse(storedReservas) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const foundUser = users.find((user) => user.email === email && user.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      return false;
    }

    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  // Función para realizar la reserva
  const reservar = (cancha, hora, userName) => {
    const reserva = { userName, hora, cancha };
    setReservas([...reservas, reserva]);
    localStorage.setItem("reservas", JSON.stringify([...reservas, reserva]));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
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
