import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterOptions from "../components/FilterOptions";
import MovieSection from "../components/MovieSection";
import "../styles/UserDashboard.css";
import logo from "../assets/Logo.png";

function UserDashboardPage() {
  const [highlyRatedMovies, setHighlyRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState([]);

  useEffect(() => {
    const userId = 73;

    axios
      .get(`https://localhost:5130/Movies/userBasedRecommendations/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        const formatted = res.data.map(
          (movie: { title: string; showId: string }, index: number) => {
            const cleanTitle = movie.title.replace(/[:']/g, "");
            return {
              id: index,
              title: movie.title,
              imageUrl: `https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/${encodeURIComponent(
                cleanTitle
              )}.jpg`,
            };
          }
        );
        setRecommendedMovies(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch recommended movies", err);
      });
  }, []);

  // Recent movies
  useEffect(() => {
    axios
      .get("https://localhost:5130/Movies/recentMovies", {
        withCredentials: true,
      })
      .then((res) => {
        const formatted = res.data.map(
          (movie: { title: string }, index: number) => {
            const cleanTitle = movie.title.replace(/[:'&!]/g, "");
            return {
              id: index,
              title: movie.title,
              imageUrl: `https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/${encodeURIComponent(
                cleanTitle
              )}.jpg`,
            };
          }
        );
        setRecentlyAddedMovies(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch recent movies", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:5130/Movies/top-rated", {
        withCredentials: true,
      })
      .then((res) => {
        const formatted = res.data.map(
          (movie: { title: string }, index: number) => {
            const cleanTitle = movie.title.replace(/[:']/g, "");
            return {
              id: index,
              title: movie.title,
              imageUrl: `https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/${encodeURIComponent(
                cleanTitle
              )}.jpg`,
            };
          }
        );

        setHighlyRatedMovies(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch top-rated movies", err);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-container">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <div className="header-actions">
            <div className="language-selector">
              <span>Language</span>
            </div>
            <Link to="/" className="sign-out-button">
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <h1 className="dashboard-title">Discover Your Next Favorite.</h1>

        <FilterOptions />

        <div className="movie-sections">
          <MovieSection title="Recent Additions" movies={recentlyAddedMovies} />
          <MovieSection
            title="Recommended For You"
            movies={recommendedMovies}
          />
          <MovieSection title="Highly Rated" movies={highlyRatedMovies} />
        </div>
      </div>
    </div>
  );
}

export default UserDashboardPage;
