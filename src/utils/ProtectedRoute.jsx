import { Navigate } from "react-router-dom";
import { getToken } from "./cookie";

const isAuthenticated = () => {
  return !!getToken();
};

export default function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}



