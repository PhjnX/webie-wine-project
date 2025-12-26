import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    alert("Vui lòng đăng nhập để xem hồ sơ!");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
