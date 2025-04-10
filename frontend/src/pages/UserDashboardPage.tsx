import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieSection from "../components/MovieSection";
import SearchPanel from "../components/SearchPanel";
import MovieSectionLoader from "../components/MovieSectionLoader";
import ScrollLoader from "../components/ScrollLoader"; // ✅ NEW IMPORT
import "../styles/UserDashboard.css";
import logo from "../assets/Logo.png";
import MoviesByGenreSection from "../components/MoviesByGenre";
import { recTypeToGenre } from "../assets/genreMap";
import RecommendedGenreFilter from "../components/RecommendedGenreFilter";

function UserDashboardPage() {
  const [highlyRatedMovies, setHighlyRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userFullName, setUserFullName] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserFullName = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5130/Movies/GetUserFullName",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserFullName(response.data.fullName);
      } catch (error) {
        console.error("Failed to fetch user full name", error);
      }
    };

    fetchUserFullName();
  }, []);

  const [isLoadingRecommended, setIsLoadingRecommended] = useState(true);
  const [isLoadingHighlyRated, setIsLoadingHighlyRated] = useState(true);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const API_URL =
    "https://cineniche4-6-apa5hjhbcbe8axg8.westcentralus-01.azurewebsites.net/Movies";

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Display User Recommendations
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5130/Movies/GetUserId", // 🚨 Adjust to your actual backend route
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserId(response.data.userId); // 🚀 store userId from response
      } catch (error) {
        console.error("Failed to fetch user ID", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${API_URL}/userBasedRecommendations/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        const formatted = res.data.map(
          (
            movie: { title: string; recommendationType: string },
            index: number
          ) => {
            const cleanTitle = movie.title.replace(/[:']/g, "");
            return {
              id: index,
              title: movie.title,
              recommendationType: movie.recommendationType,
              imageUrl: `https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/${encodeURIComponent(cleanTitle)}.jpg`,
            };
          }
        );
        setRecommendedMovies(formatted);
      })

      .catch((err) => {
        console.error("Failed to fetch recommended movies", err);
      })
      .finally(() => {
        setIsLoadingRecommended(false);
      });
  }, [userId]);

  useEffect(() => {
    axios
      .get(`${API_URL}/recentMovies`, {
        withCredentials: true,
      })
      .then((res) => {
        const formatted = res.data.map(
          (movie: { title: string }, index: number) => {
            const cleanTitle = movie.title.replace(/[:'&!]/g, "");
            return {
              id: index,
              title: movie.title,
              imageUrl: `https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/${encodeURIComponent(cleanTitle)}.jpg`,
            };
          }
        );
        setRecentlyAddedMovies(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch recent movies", err);
      })
      .finally(() => {
        setIsLoadingRecent(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/top-rated`, {
        withCredentials: true,
      })
      .then((res) => {
        const formatted = res.data.map(
          (movie: { title: string }, index: number) => {
            const cleanTitle = movie.title.replace(/[:'&]/g, "");
            return {
              id: index,
              title: movie.title,
              imageUrl: `https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/${encodeURIComponent(cleanTitle)}.jpg`,
            };
          }
        );
        setHighlyRatedMovies(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch top-rated movies", err);
      })
      .finally(() => {
        setIsLoadingHighlyRated(false);
      });
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const filteredRecommended = selectedGenre
    ? recommendedMovies.filter(
        (movie: any) =>
          recTypeToGenre[movie.recommendationType] === selectedGenre
      )
    : recommendedMovies;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-container">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          <div className="header-actions">
            <div className="language-selector"></div>
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
      {/* New User Welcome Text */}
      <div className="user-welcome">
        <span>Welcome, {userFullName || "Guest"}!</span>
      </div>
      <div className="dashboard-content">
        <h1 className="dashboard-title">Discover Your Next Favorite.</h1>

        <div className="movie-sections">
          <RecommendedGenreFilter userId={73} />

          {isLoadingHighlyRated ? (
            <MovieSectionLoader />
          ) : (
            <MovieSection title="Highly Rated" movies={highlyRatedMovies} />
          )}

          {isLoadingRecent ? (
            <MovieSectionLoader />
          ) : (
            <MovieSection
              title="Recent Additions"
              movies={recentlyAddedMovies}
            />
          )}

          {/* Genre-based sections */}
          <MoviesByGenreSection genre="Comedy" />
          <MoviesByGenreSection genre="Action" />
          <MoviesByGenreSection genre="Anime Series International TV Shows" />
          <MoviesByGenreSection genre="British TV Shows Docuseries International TV Shows" />
          <MoviesByGenreSection genre="Children" />
          <MoviesByGenreSection genre="Comedies" />
          <MoviesByGenreSection genre="Comedies Dramas International Movies" />
          <MoviesByGenreSection genre="Comedies Romantic Movies" />
          <MoviesByGenreSection genre="Crime TV Shows Docuseries" />
          <MoviesByGenreSection genre="Documentaries" />
          <MoviesByGenreSection genre="Documentaries International Movies" />
          <MoviesByGenreSection genre="Docuseries" />
          <MoviesByGenreSection genre="Dramas" />
          <MoviesByGenreSection genre="Dramas International Movies" />
          <MoviesByGenreSection genre="Dramas Romantic Movie" />
          <MoviesByGenreSection genre="Family Movies" />
          <MoviesByGenreSection genre="Fantasy" />
          <MoviesByGenreSection genre="Horror Movies" />
          <MoviesByGenreSection genre="International Movies Thrillers" />
          <MoviesByGenreSection genre="International TV Shows Romantic TV Shows TV Dramas" />
          <MoviesByGenreSection genre="Kids' TV" />
          <MoviesByGenreSection genre="Language TV Shows" />
          <MoviesByGenreSection genre="Musicals" />
          <MoviesByGenreSection genre="Nature TV" />
          <MoviesByGenreSection genre="Reality TV" />
          <MoviesByGenreSection genre="Spirituality" />
          <MoviesByGenreSection genre="TV Action" />
          <MoviesByGenreSection genre="TV Comedies" />
          <MoviesByGenreSection genre="Talk Shows TV Comedies" />
          <MoviesByGenreSection genre="Thrillers" />

          {/* 🌀 Scroll loader at the bottom */}
          <ScrollLoader />
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
