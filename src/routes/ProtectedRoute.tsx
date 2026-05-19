import { useEffect, type PropsWithChildren } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = PropsWithChildren & {
  requireAuth?: boolean;
};

export default function ProtectedRoute({
  children,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && user === null) {
      navigate("/login", { replace: true });
    } else if (!requireAuth && user !== null) {
      navigate("/", { replace: true });
    }
  }, [isLoading, user, navigate, requireAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
}
