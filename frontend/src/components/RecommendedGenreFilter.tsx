import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PosterNotFound from "../assets/PosterNotFound.webp";
import "../styles/MovieSection.css";
import "../styles/RecommendedGenreFilter.css";

interface Movie {
  title: string;
  showId: string;
}

interface MovieWithImageUrl extends Movie {
  imageUrl: string;
}

interface RecommendedGenreFilterProps {
  userId: number;
}

const genres = [
  { label: "Top Picks", value: "top_picks" },
  { label: "Action", value: "action_recs" },
  { label: "Adventure", value: "adventure_recs" },
  {
    label: "Anime Series International TV Shows",
    value: "anime_series_international_tv_shows_recs",
  },
  {
    label: "British TV Shows Docuseries International TV Shows",
    value: "british_tv_shows_docuseries_international_tv_shows_recs",
  },
  { label: "Children", value: "children_recs" },
  { label: "Comedies", value: "comedies_recs" },
  {
    label: "Comedies Dramas International Movies",
    value: "comedies_dramas_international_movies_recs",
  },
  {
    label: "Comedies International Movies",
    value: "comedies_international_movies_recs",
  },
  { label: "Comedies Romantic Movies", value: "comedies_romantic_movies_recs" },
  {
    label: "Crime TV Shows Docuseries",
    value: "crime_tv_shows_docuseries_recs",
  },
  { label: "Documentaries", value: "documentaries_recs" },
  {
    label: "Documentaries International Movies",
    value: "documentaries_international_movies_recs",
  },
  { label: "Docuseries", value: "docuseries_recs" },
  { label: "Dramas", value: "dramas_recs" },
  {
    label: "Dramas International Movies",
    value: "dramas_international_movies_recs",
  },
  { label: "Dramas Romantic Movies", value: "dramas_romantic_movies_recs" },
  { label: "Family Movies", value: "family_movies_recs" },
  { label: "Fantasy", value: "fantasy_recs" },
  { label: "Horror Movies", value: "horror_movies_recs" },
  {
    label: "International Movies Thrillers",
    value: "international_movies_thrillers_recs",
  },
  {
    label: "International TV Shows Romantic TV Shows TV Dramas",
    value: "international_tv_shows_romantic_tv_shows_tv_dramas_recs",
  },
  { label: "Kids' TV", value: "kids_tv_recs" },
  { label: "Language TV Shows", value: "language_tv_shows_recs" },
  { label: "Musicals", value: "musicals_recs" },
  { label: "Nature TV", value: "nature_tv_recs" },
  { label: "Reality TV", value: "reality_tv_recs" },
  { label: "Spirituality", value: "spirituality_recs" },
  { label: "Talk Shows TV Comedies", value: "talk_shows_tv_comedies_recs" },
  { label: "Thrillers", value: "thrillers_recs" },
  { label: "TV Action", value: "tv_action_recs" },
  { label: "TV Comedies", value: "tv_comedies_recs" },
  { label: "TV Dramas", value: "tv_dramas_recs" },
];

function RecommendedGenreFilter({ userId }: RecommendedGenreFilterProps) {
  const [selectedGenre, setSelectedGenre] = useState("top_picks");
  const [movies, setMovies] = useState<MovieWithImageUrl[]>([]);

  useEffect(() => {
    if (!selectedGenre) return;

    fetch(
      `https://localhost:5130/Movies/userBasedRecommendationsByGenre/${userId}?genre=${encodeURIComponent(selectedGenre)}`,
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
        console.error("Failed to fetch genre-based recommendations", err);
      });
  }, [selectedGenre, userId]);

  return (
    <div className="genre-filter-container">
      <h2>Recommended For You </h2>
      <label htmlFor="genre-select">Select a genre:</label>
      <select
        id="genre-select"
        className="genre-dropdown"
        onChange={(e) => setSelectedGenre(e.target.value)}
        value={selectedGenre}
      >
        <option value="">--Choose a genre--</option>
        {genres.map((g) => (
          <option key={g.value} value={g.value}>
            {g.label}
          </option>
        ))}
      </select>

      {movies.length > 0 && (
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
      )}
    </div>
  );
}

export default RecommendedGenreFilter;
