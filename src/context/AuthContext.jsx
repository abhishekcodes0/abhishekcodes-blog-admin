import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config/urlConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with your authentication logic
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      // Validate token and set user
      setUser(localStorage.getItem("user"));
    }
  }, []);

  const login = (userData) => {
    axios.post(`${apiUrl}/api/auth/signin`, userData).then((res) => {
      if (res?.data?._id) {
        setUser(res.data);
        localStorage.setItem("access_token", "Bearer " + res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));

        navigate("/dashboard"); // Redirect to a protected page
      }
    });
  };

  const logout = () => {
    // Replace with your logout logic
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
