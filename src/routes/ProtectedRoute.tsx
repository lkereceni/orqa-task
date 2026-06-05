import type { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../shared/components/Loading/Loading";
import { useAuth } from "../features/auth";

type ProtectedRouteProps = PropsWithChildren & {
  requireAuth?: boolean;
};

export default function ProtectedRoute({
  children,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
}
