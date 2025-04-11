import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface UserRouteProps {
  children: ReactNode;
}

const UserRoute = ({ children }: UserRouteProps) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/forbidden" replace />; // 🆕 Go to ForbiddenPage
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const roles =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    const rolesArray = Array.isArray(roles) ? roles : [roles];

  if (rolesArray.includes("User") || rolesArray.includes("Administrator")) {
      return children;
    } else {
      return <Navigate to="/forbidden" replace />; // 🆕
    }
  } catch (error) {
    console.error("Error decoding token", error);
    return <Navigate to="/forbidden" replace />; // 🆕
  }
};

export default UserRoute;
