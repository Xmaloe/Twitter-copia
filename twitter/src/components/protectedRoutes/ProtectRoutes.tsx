import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ChildrenType = {
  children: ReactNode;
};

const ProtectRoute = ({ children }: ChildrenType) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectRoute;
