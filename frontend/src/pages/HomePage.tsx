import Header from "../components/Header";
import HomeBackground from "../assets/Home Background.png";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import AutoScrollMovies from "../components/AutoScrollMovies";
import CookiesPopup from "../components/CookiesPopup";

function HomePage() {
  // Add navigation
  const navigate = useNavigate();

  // Movie data for the auto-scrolling section
  const discoverMovies = [
    {
      id: "1",
      title: "Batman The Killing Joke",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/507989c8bed3f80ef72f624739ad58478ed4cdd5",
    },
    {
      id: "2",
      title: "At the Dolphin Bay",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a9fab35361a88e96ec412e1c4bf010967d629a3b",
    },
    {
      id: "3",
      title: "Dolly Parton Here I Am",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ffed569aafb3fe97be4c2817c66026992bbdec7f",
    },
    {
      id: "10",
      title: "Everything Sucks",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9dcb2a07da01cafa38d53b787e046b83c49079c4",
    },
    {
      id: "11",
      title: "H2O Just Add Water",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c0ef3a983f566af76fa9c88d0b5bfbe7115ea9ba",
    },
    {
      id: "12",
      title: "Crime Stories: India Detectives",
      imageUrl:
        "https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/Crime%20Stories%20India%20Detectives.jpg",
    },
  ];

  // HTML returned
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
              Ready to watch? Click the button create your membership.
            </p>
            <div className="cta-container">
              <button
                onClick={() => navigate("/signup/step1")}
                className="get-started-button"
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="pricing-info">
        <p>Starting at $9.99. No commitments. Cancel anytime.</p>
      </div>

      <AutoScrollMovies title="Yours To Discover" movies={discoverMovies} />
      <CookiesPopup />
    </div>
  );
}

export default HomePage;
