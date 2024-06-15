import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate("/login");
    }
  }, [user]);

  // If user is authenticated, render children
  return user ? children : null;
};

export default PrivateRoute;
