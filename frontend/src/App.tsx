import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import MovieListPage from "./pages/MovieListPage";
import PrivacyPage from "./pages/PrivacyPage";
import CreateAccountPage from "./pages/CreateAccountPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createaccount" element={<CreateAccountPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/movieinfo/:id" element={<MovieInfoPage />} />
          {/*  expects an id */}
          <Route path="/movies" element={<MovieListPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
