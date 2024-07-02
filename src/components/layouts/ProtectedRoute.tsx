import { ReactNode } from "react";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(useCurrentToken);
    const location = useLocation();
  
    if (!token) {
      return <Navigate to="/login" state={{ from: location.pathname }} replace={true} />;
    }
  
    return children;
  };
  

export default ProtectedRoute;