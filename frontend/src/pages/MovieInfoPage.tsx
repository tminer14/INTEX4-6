import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/MovieInfoPage.css";
import logo from "../assets/Logo.png";
import { Movie } from "../types/Movie";
import axios from "axios";
import toast from "react-hot-toast";

// Mock data for a single movie - in a real app, this would come from an API
const mockMovie: Movie = {
  title: "Name of Movie",
  type: "Movie",
  genre: "Action",
  description: "Intex is real y'all",
  director: "Kermit the Frog",
  cast: "Emma Helquist, Payton Hatch, Addison Smith, Tessa Miner",
  releaseYear: 2025,
  duration: "128 minutes",
  country: "United States",
  rating: "4.5",
  showId: "",

};

function MovieInfoPage() {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  // Function to add points
  const addPoints = () => {
    const currentPoints = parseInt(Cookies.get("userPoints") || "0");
    const newPoints = currentPoints + 10;
    Cookies.set("userPoints", newPoints.toString(), { expires: 7 });

    toast.success(`You've earned 10 points! Total: ${newPoints}`); // ✅
  };

useEffect(() => {
  axios
    .get(`https://localhost:7026/Movies/details/${title}`, {
      withCredentials: true,
    })
    .then((res) => {
      setMovie(res.data);
      addPoints();
    })
    .catch((err) => {
      console.error("Failed to fetch movie details", err);
    });
}, [title]);



  const handleBack = () => {
    navigate(-1);
  };

  const handleSignOut = () => {
    // Implementation for signing out
    navigate("/");
  };

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
    // In a real app, you would send this rating to your backend
    alert(`You rated this movie ${rating} stars!`);
  };

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
        <img src={logo} alt="Cinema Logo" className="logo-image" />
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
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.7082 17.5H7.2915M7.2915 17.5L17.4998 27.7083M7.2915 17.5L17.4998 7.29167"
                  stroke="#1E1E1E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="movie-poster">
              <img alt={movie.title} className="poster-image" />
            </div>
            <div className="play-button">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                  stroke="#1E1E1E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M20 16L32 24L20 32V16Z"
                  stroke="#1E1E1E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
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
                <span className="info-value">{movie.genre}</span>
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
                <span className="info-value">{movie.rating}/5</span>
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
    </div>
  );
}

export default MovieInfoPage;
