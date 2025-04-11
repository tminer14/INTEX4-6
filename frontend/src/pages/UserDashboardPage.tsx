import { useEffect, useState } from "react";
import axios from "axios";
import MovieSection from "../components/MovieSection";
import SearchPanel from "../components/SearchPanel";
import MovieSectionLoader from "../components/MovieSectionLoader";
import ScrollLoader from "../components/ScrollLoader";
import "../styles/UserDashboard.css";
import logo from "../assets/Logo.png";
import MoviesByGenreSection from "../components/MoviesByGenre";
import RecommendedGenreFilter from "../components/RecommendedGenreFilter";

function UserDashboardPage() {
  const [highlyRatedMovies, setHighlyRatedMovies] = useState([]);
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userFullName, setUserFullName] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoadingHighlyRated, setIsLoadingHighlyRated] = useState(true);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);

  const API_URL =
    "https://cineniche4-6swag-ebcmanakcbdxfkgz.eastus-01.azurewebsites.net/Movies";

  useEffect(() => {
    const fetchUserFullName = async () => {
      try {
        const response = await axios.get(`${API_URL}/GetUserFullName`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserFullName(response.data.fullName);
      } catch (error) {
        console.error("Failed to fetch user full name", error);
      }
    };

    fetchUserFullName();
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${API_URL}/GetUserId`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Failed to fetch user ID", error);
      }
    };

    fetchUserId();
  }, []);

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

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-container">
          <a href="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
          </a>

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
            <a href="/" className="sign-out-button">
              <span>Sign Out</span>
            </a>
          </div>
        </div>
      </header>

      <div className="user-welcome">
        <span>Welcome, {userFullName || "Guest"}!</span>
      </div>

      <div className="dashboard-content">
        <h1 className="dashboard-title">Discover Your Next Favorite.</h1>

        <div className="movie-sections">
          <RecommendedGenreFilter userId={userId || 73} />

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
          {[
            "Comedy",
            "Action",
            "Anime Series International TV Shows",
            "British TV Shows Docuseries International TV Shows",
            "Children",
            "Comedies",
            "Comedies Dramas International Movies",
            "Comedies Romantic Movies",
            "Crime TV Shows Docuseries",
            "Documentaries",
            "Documentaries International Movies",
            "Docuseries",
            "Dramas",
            "Dramas International Movies",
            "Dramas Romantic Movie",
            "Family Movies",
            "Fantasy",
            "Horror Movies",
            "International Movies Thrillers",
            "International TV Shows Romantic TV Shows TV Dramas",
            "Kids' TV",
            "Language TV Shows",
            "Musicals",
            "Nature TV",
            "Reality TV",
            "Spirituality",
            "TV Action",
            "TV Comedies",
            "Talk Shows TV Comedies",
            "Thrillers",
          ].map((genre) => (
            <MoviesByGenreSection key={genre} genre={genre} />
          ))}

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
