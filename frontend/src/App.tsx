import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MovieListPage from "./pages/MovieListPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import LoginPage from "./pages/LoginPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import PrivacyPage from "./pages/PrivacyPage";
import AdminRoute from "./components/AdminRoute";
import AdminMoviesPage from "./pages/AdminMoviesPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Footer from "./components/Footer";
import CreateAccountWizard from "./components/CreateAccountWizard";
import ForbiddenPage from "./pages/ForbiddenPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieListPage />} />
        <Route path="/Movies/details/:title" element={<MovieInfoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
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
