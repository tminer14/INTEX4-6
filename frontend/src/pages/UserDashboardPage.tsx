import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterOptions from "../components/FilterOptions";
import MovieSection from "../components/MovieSection";
import SearchPanel from "../components/SearchPanel";
import "../styles/UserDashboard.css";
import logo from "../assets/Logo.png";

function UserDashboardPage() {
  const [highlyRatedMovies, setHighlyRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };


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

  // Toggle function
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

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
            <button
              className="search-button"
              onClick={toggleSearch}
              aria-label="Search movies"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                  fill="#F7F7FF"
                />
              </svg>
            </button>
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

      <SearchPanel
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}

export default UserDashboardPage;
