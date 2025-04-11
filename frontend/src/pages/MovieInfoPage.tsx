import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/MovieInfoPage.css";
import logo from "../assets/Logo.png";
import { Movie } from "../types/Movie";
import axios from "axios";
import toast from "react-hot-toast";
import MovieSection from "../components/MovieSection";
import PosterNotFound from "../assets/PosterNotFound.webp";

function MovieInfoPage() {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [userId, setUserId] = useState<number | null>(73);

  const addPoints = () => {
    const currentPoints = parseInt(Cookies.get("userPoints") || "0");
    const newPoints = currentPoints + 10;
    Cookies.set("userPoints", newPoints.toString(), { expires: 7 });
    toast.success(`You've earned 10 points! Total: ${newPoints}`);
  };

  useEffect(() => {
    axios
      .get(
        `https://cineniche4-6swag-ebcmanakcbdxfkgz.eastus-01.azurewebsites.net/Movies/details/${title}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const movieData = res.data;
        setMovie(movieData);
        addPoints();

        const cleaned = movieData.title.replace(/[:'"?&-]/g, "");
        const encoded = encodeURIComponent(cleaned);
        const url = `https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/${encoded}.jpg`;
        setImageUrl(url);
        console.log("📸 Poster image URL:", url);
      })
      .catch((err) => {
        console.error("Failed to fetch movie details", err);
      });
  }, [title]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          "https://cineniche4-6swag-ebcmanakcbdxfkgz.eastus-01.azurewebsites.net/Movies/GetUserId", // 🚨 Adjust to your actual backend route
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
    const source_show_id = "s12"; // optional: make dynamic
    axios
      .get(
        `https://cineniche4-6swag-ebcmanakcbdxfkgz.eastus-01.azurewebsites.net/Movies/movieBasedRecommendations/${source_show_id}`,
        { withCredentials: true }
      )
      .then((res) => {
        const formatted = res.data.map(
          (movie: { title: string }, index: number) => {
            const cleanTitle = movie.title.replace(/[:'&!-]/g, "");
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
        console.error("Failed to fetch recent movies", err);
      });
  }, []);

  // 🟡 Load user's existing rating from backend
  useEffect(() => {
    if (!movie?.showId) return;

    const fetchUserRating = async () => {
      try {
        const response = await axios.get(
          `https://cineniche4-6swag-ebcmanakcbdxfkgz.eastus-01.azurewebsites.net/Movies/rating?userId=${userId}&showId=${movie.showId}`,
          { withCredentials: true }
        );
        setUserRating(response.data.rating);
        console.log("⭐ Loaded user rating:", response.data.rating);
      } catch (err) {
        console.log("No existing rating found.");
      }
    };

    fetchUserRating();
  }, [movie?.showId]);

  // 🟡 Send rating to backend on click
  const handleRatingClick = async (rating: number) => {
    setUserRating(rating);

    if (!movie?.showId) {
      console.error("No ShowId available.");
      return;
    }

    const payload = {
      userId: userId,
      showId: movie.showId,
      rating: rating,
    };

    try {
      const response = await axios.post(
        "https://cineniche4-6swag-ebcmanakcbdxfkgz.eastus-01.azurewebsites.net/Movies/rate",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("✅ Rating submitted:", response.data);
      toast.success(`You rated this movie ${rating} stars!`);
    } catch (error) {
      console.error("❌ Error submitting rating:", error);
      toast.error("Failed to submit rating.");
    }
  };

  const handleBack = () => navigate(-1);

  const handleSignOut = () => navigate("/");

  if (!movie) {
    return (
      <div className="movie-info-loading">
        <p>Loading movie information...</p>
      </div>
    );
  }

  return (
    <div className="movie-view-page">
      <div className="header-background">
        <a href="/dashboard" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        <div className="header-actions">
          <div className="language-selector">Language</div>
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      <div className="movie-content-background">
        <div className="movie-content-container">
          <div className="movie-media-column">
            <div className="back-button" onClick={handleBack}>
              {/* back icon */}
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path
                  d="M27.7082 17.5H7.2915M7.2915 17.5L17.4998 27.7083M7.2915 17.5L17.4998 7.29167"
                  stroke="#f7f7ff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="movie-poster">
              <img
                src={imageUrl}
                alt={movie.title}
                className="poster-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = PosterNotFound;
                }}
              />
            </div>
          </div>

          <div className="movie-info-column">
            <div className="movie-info-content">
              <h1 className="movie-title">{movie.title}</h1>
              <div className="info-row">
                <span className="info-label">Type:</span>
                <span className="info-value">{movie.type}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Genre:</span>
                <span className="info-value">{movie.genres?.join(", ")}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Description:</span>
                <span className="info-value">{movie.description}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Director:</span>
                <span className="info-value">{movie.director}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Cast:</span>
                <span className="info-value">{movie.cast}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Year:</span>
                <span className="info-value">{movie.releaseYear}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Duration:</span>
                <span className="info-value">{movie.duration}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Country:</span>
                <span className="info-value">{movie.country}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Rating:</span>
                <span className="info-value">{movie.rating}</span>
              </div>

              <div className="rating-label">Seen it? Rate this movie:</div>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={`star ${
                      star <= (hoveredRating || userRating) ? "active" : ""
                    }`}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill={
                        star <= (hoveredRating || userRating)
                          ? "#FC7853"
                          : "none"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.9998 2.16669L16.3473 8.94835L23.8332 10.0425L18.4165 15.3184L19.6948 22.7717L12.9998 19.2509L6.30484 22.7717L7.58317 15.3184L2.1665 10.0425L9.65234 8.94835L12.9998 2.16669Z"
                        stroke="#1E1E1E"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MovieSection title="More like this" movies={recommendedMovies} />
    </div>
  );
}

export default MovieInfoPage;
