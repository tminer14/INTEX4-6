import { Link } from "react-router-dom";
import "../styles/MovieSection.css";
import { useState } from "react";
import { Movie } from "../types/Movie";
import PosterNotFound from "../assets/PosterNotFound.webp";

interface MovieWithImageUrl extends Movie {
  imageUrl: string;
}

interface MovieSectionProps {
  title: string;
  movies: MovieWithImageUrl[];
}

function MovieSection({ title, movies }: MovieSectionProps) {
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>(
    {}
  );

  const handleImageError = (title: string) => {
    setImageErrorMap((prev) => ({ ...prev, [title]: true }));
  };

  return (
    <div className="movie-section">
      <h2 className="section-title">{title}</h2>
      <div className="movie-cards-container">
        {movies.map((movie) => (
          <Link
            to={`/Movies/details/${encodeURIComponent(movie.title)}`}
            key={movie.title}
            className="movie-card-link"
          >
            <img
              src={imageErrorMap[movie.title] ? PosterNotFound : movie.imageUrl}
              alt={movie.title}
              className="movie-card"
              onError={() => handleImageError(movie.title)}
            />
            {imageErrorMap[movie.title] && (
              <p className="backup-movie-files">{movie.title}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieSection;
