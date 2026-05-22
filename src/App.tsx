import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthProvider from "./providers/AuthProvider";
import Login from "./pages/Login/Login";
import UserManagement from "./pages/UserManagement/UserManagement";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-management" element={<UserManagement />} />

              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
