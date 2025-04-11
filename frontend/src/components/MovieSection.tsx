import { Link } from "react-router-dom";
import "../styles/MovieSection.css";
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
              src={movie.imageUrl}
              alt={movie.title}
              className="movie-card"
              onError={(e) => {
                e.currentTarget.onerror = null; // 🛡 prevent infinite loop
                e.currentTarget.src = PosterNotFound;
                <p className="backup-movie-files">{movie.title}</p>;
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieSection;
