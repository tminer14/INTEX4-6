import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PosterNotFound from "../assets/PosterNotFound.webp";
import "../styles/MovieSection.css";

interface Movie {
  title: string;
  showId: string;
}

interface MovieWithImageUrl extends Movie {
  imageUrl: string;
}

interface MoviesByGenreSectionProps {
  genre: string;
}

function MoviesByGenreSection({ genre }: MoviesByGenreSectionProps) {
  const [movies, setMovies] = useState<MovieWithImageUrl[]>([]);

  useEffect(() => {
    if (!genre) return;

    fetch(
      `https://cineniche4-6swag-ebcmanakcbdxfkgz.eastus-01.azurewebsites.net/Movies/basedOnGenre?genre=${encodeURIComponent(genre)}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((movie: Movie) => {
          const cleanTitle = movie.title.replace(/[:'"?&]/g, "");
          return {
            ...movie,
            imageUrl: `https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/${encodeURIComponent(
              cleanTitle
            )}.jpg`,
          };
        });
        setMovies(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch movies by genre", err);
      });
  }, [genre]);

  if (movies.length === 0) return null;

  return (
    <div className="movie-section">
      <h2 className="section-title">More {genre} Movies</h2>
      <div className="movie-cards-container">
        {movies.map((movie) => (
          <Link
            to={`/Movies/details/${encodeURIComponent(movie.title)}`}
            key={movie.showId}
            className="movie-card-link"
          >
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="movie-card"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = PosterNotFound;
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MoviesByGenreSection;
