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
import CreateAccountStep1 from "./components/CreateAccountStep1";
import CreateAccountStep2 from "./components/CreateAccountStep2";
import CreateAccountStep3 from "./components/CreateAccountStep3";
import CreateAccountStep4 from "./components/CreateAccountStep4";
import CreateAccountStep5 from "./components/CreateAccountStep5";

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
        <Route path="/signup/step1" element={<CreateAccountStep1 />} />
        <Route path="/signup/step2" element={<CreateAccountStep2 />} />
        <Route path="/signup/step3" element={<CreateAccountStep3 />} />
        <Route path="/signup/step4" element={<CreateAccountStep4 />} />
        <Route path="/signup/step5" element={<CreateAccountStep5 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
