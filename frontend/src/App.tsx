import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieListPage from "./pages/MovieListPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import LoginPage from "./pages/LoginPage";
import PrivacyPage from "./pages/PrivacyPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import Footer from "./components/Footer";
import "./App.css";
import CreateAccountStep1 from "./components/CreateAccountStep1";
import CreateAccountStep2 from "./components/CreateAccountStep2";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieListPage />} />
        <Route path="/movie/:id" element={<MovieInfoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/signup" element={<CreateAccountStep1 />} />
        <Route path="/signup/step2" element={<CreateAccountStep2 />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
