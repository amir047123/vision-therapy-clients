import { Navigate } from "react-router-dom";
import AuthUser from "../Hooks/authUser";
import { toast } from "react-toastify";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { token, userRole,logout } = AuthUser();

  if (!token) {
    toast.error("Please login first");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    logout();
    toast.error("You do not have permission to view this page");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
