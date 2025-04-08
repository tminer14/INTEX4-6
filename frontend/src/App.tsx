import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieListPage from "./pages/MovieListPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import LoginPage from "./pages/LoginPage";
import PrivacyPage from "./pages/PrivacyPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieListPage />} />
        <Route path="/movie/:id" element={<MovieInfoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
