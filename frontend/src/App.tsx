import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import MovieListPage from "./pages/MovieListPage";
import PrivacyPage from "./pages/PrivacyPage";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createaccount" element={<Step1 />} />
          <Route path="/createaccount/step2" element={<Step2 />} />
          <Route path="/createaccount/step3" element={<Step3 />} />
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
