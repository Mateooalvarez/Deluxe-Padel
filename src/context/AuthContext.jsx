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

  console.log("✅ API_URL:", API_URL);
  console.log("🧪 process.env:", process.env);

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

router.post('/register', async (req, res) => {
  const { name, email, password, role = 'usuario' } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const newUser = new User({ name, email, password, role }); // ✅ Se guarda el rol

    await newUser.save();

    // Crear token real
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
      role: newUser.role,
      token
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

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
