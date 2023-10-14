import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const prevLocation = useLocation();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login", { state: prevLocation.pathname });
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
