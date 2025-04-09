import { Link, useNavigate } from "react-router-dom";
import "../styles/MovieSection.css";
import { Movie } from "../types/Movie";

interface MovieSectionProps {
  title: string;
  movies: DisplayMovie[];
}

interface DisplayMovie {
  title: string;
  imageUrl: string;
}

function MovieSection({ title, movies }: MovieSectionProps) {
  return (
    <div className="movie-section">
      <h2 className="section-title">{title}</h2>√
      <div className="movie-cards-container">
        {movies.map((movie) => {
          return (
            <Link
              to={`/Movies/details/${encodeURIComponent(movie.title)}`}
              key={movie.title}
              className="movie-card-link"
            >
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="movie-card"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MovieSection;
