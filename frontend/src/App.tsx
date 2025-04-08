
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MovieListPage from "./pages/MovieListPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import LoginPage from "./pages/LoginPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import PrivacyPage from "./pages/PrivacyPage";
import AdminMoviesPage from "./pages/AdminMoviesPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Footer from "./components/Footer";
import CreateAccountWizard from "./components/CreateAccountWizard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieListPage />} />
        <Route path="/movie/:id" element={<MovieInfoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/movies" element={<AdminMoviesPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />

        {/* ✅ Correct signup route */}
        <Route path="/signup/*" element={<CreateAccountWizard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
