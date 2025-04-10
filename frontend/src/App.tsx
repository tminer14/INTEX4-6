import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import MovieListPage from "./pages/MovieListPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import LoginPage from "./pages/LoginPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import PrivacyPage from "./pages/PrivacyPage";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import AdminMoviesPage from "./pages/AdminMoviesPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Footer from "./components/Footer";
import CreateAccountWizard from "./components/CreateAccountWizard";
import ForbiddenPage from "./pages/ForbiddenPage";
import { Toaster } from "react-hot-toast";

function App() {
  const navigate = useNavigate(); // 👈 added navigate
  const THIRTY_MINUTES = 30 * 60 * 1000; // 30 minutes in ms

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    const handleLogout = () => {
      localStorage.removeItem("authToken");
      navigate("/"); // 👈 send user to homepage
      window.location.reload(); // optional: hard reload
    };

    let timeoutId: ReturnType<typeof setTimeout>;

    if (token) {
      timeoutId = setTimeout(() => {
        handleLogout();
      }, THIRTY_MINUTES);
    }

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <UserDashboardPage />
            </UserRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <UserRoute>
              <MovieListPage />
            </UserRoute>
          }
        />
        <Route
          path="/Movies/details/:title"
          element={
            <UserRoute>
              <MovieInfoPage />
            </UserRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/movies"
          element={
            <AdminRoute>
              <AdminMoviesPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsersPage />
            </AdminRoute>
          }
        />

        {/* ✅ Correct signup route */}
        <Route path="/signup/*" element={<CreateAccountWizard />} />
      </Routes>
      <Footer />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          error: {
            icon: "⚠️",
          },
          success: {
            icon: "",
          },
        }}
      />
    </div>
  );
}

export default App;
