import { Navigate, useLocation } from "react-router-dom";
import { getToken, getRole } from "../lib/Jwt";

type Props = {
  children: JSX.Element;
  roles?: string[];
};

export default function ProtectedRoute({ children, roles }: Props) {
  const token = getToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles && roles.length > 0) {
    const role = getRole();
    const allowed = role && roles.map(r => r.toLowerCase()).includes(role);
    if (!allowed) return <Navigate to="/forbidden" replace />;
  }

  return children;
}
