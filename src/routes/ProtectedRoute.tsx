import { useEffect, type PropsWithChildren } from "react";
import { useNavigate, Outlet } from "react-router-dom";
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
    return <Loading />;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
}
