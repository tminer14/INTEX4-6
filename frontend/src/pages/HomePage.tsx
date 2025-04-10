import Header from "../components/Header";
import HomeBackground from "../assets/Home Background.png";
import InputDesign from "../components/InputDesign";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  // Add navigation
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <section className="hero-section">
          <img
            src={HomeBackground}
            alt="Hero background"
            className="hero-background"
          />
          <div className="hero-content">
            <h1 className="hero-title">
              Be the first to discover these films. Anytime, anywhere.
            </h1>
            <p className="hero-subtitle">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="cta-container">
              <input
                type="email"
                placeholder="Enter your email"
                className="email-input"
              />
              <button
                onClick={() => navigate("/signup/step1")}
                className="get-started-button"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="pricing-info">
            Starting at $9.99. No commitments. Cancel anytime.
          </div>
        </section>
        <InputDesign />
      </div>
    </div>
  );
}

export default HomePage;
