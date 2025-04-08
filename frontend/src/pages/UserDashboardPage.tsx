import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterOptions from "../components/FilterOptions";
import MovieSection from "../components/MovieSection";
import "../styles/UserDashboard.css";
import logo from "../assets/Logo.png";

const recentMovies = [
  {
    id: 1,
    title: "Movie 1",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/9f0363ff8b6cee50aa6e91f5437a97a9fc2a74d8",
  },
  {
    id: 2,
    title: "Movie 2",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4827782184bbf1e045ad26ab5e2c99d8f260933a",
  },
  {
    id: 3,
    title: "Movie 3",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1d0a8f2514b7c9dcdd51a2e19190cf9c9df70585",
  },
  {
    id: 4,
    title: "Movie 4",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/fc7e0eaa9aeb747977ef609b719d3e8046710ae6",
  },
  {
    id: 5,
    title: "Movie 5",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d157979a3e040dc28e58dd1e5335d67f9be1eba9",
  },
];

const similarMovies = [
  {
    id: 11,
    title: "Movie 11",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/5d3bffcabb1cdcfa545d955d58f2f0a9920bda70",
  },
  {
    id: 12,
    title: "Movie 12",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c0b2d21b2321b77c0577070590528a5e6d18ab91",
  },
  {
    id: 13,
    title: "Movie 13",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b4c27a6c345e876d1da20d13f40b2cd83c5dd14e",
  },
  {
    id: 14,
    title: "Movie 14",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/9f4dd6dd15ac54ce0b4912e0d61e0c92905c89f5",
  },
  {
    id: 15,
    title: "Movie 15",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1453465946b91d021d463710dffce2838b6c0635",
  },
];

function UserDashboardPage() {
  const [highlyRatedMovies, setHighlyRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

useEffect(() => {
  const userId = 73;

  axios
    .get(`https://localhost:7026/Movies/userBasedRecommendations/${userId}`, {
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


useEffect(() => {
  axios
    .get("https://localhost:7026/Movies/top-rated", {
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
          <MovieSection title="Recent Additions" movies={recentMovies} />
          <MovieSection
            title="Recommended For You"
            movies={recommendedMovies}
          />
          <MovieSection
            title="Similar to Movies You Have Watched"
            movies={similarMovies}
          />
          <MovieSection title="Highly Rated" movies={highlyRatedMovies} />
        </div>
      </div>
    </div>
  );
}

export default UserDashboardPage;
