import React from "react";

interface Movie {
  id: number;
  type: string;
  title: string;
  director: string;
  cast: string;
  country: string;
  year: number;
  rating: string;
  duration: string;
  description: string;
  genre: string;
}

interface AdminMovieTableProps {
  movies: Movie[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const AdminMovieTable: React.FC<AdminMovieTableProps> = ({
  movies,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="movie-table-container">
      <div className="movie-table">
        <div className="table-header">
          <div className="header-id">ID</div>
          <div className="header-type">Type</div>
          <div className="header-title">Title</div>
          <div className="header-director">Director</div>
          <div className="header-cast">Cast</div>
          <div className="header-country">Country</div>
          <div className="header-year">Year</div>
          <div className="header-rating">Rating</div>
          <div className="header-duration">Duration</div>
          <div className="header-description">Description</div>
          <div className="header-genre">Genre</div>
          <div className="header-action">Action</div>
        </div>

        {movies.map((movie, index) => (
          <div className="table-row" key={`${movie.id}-${index}`}>
            <div className="cell-id">{movie.id}</div>
            <div className="cell-type">{movie.type}</div>
            <div className="cell-title">{movie.title}</div>
            <div className="cell-director">{movie.director}</div>
            <div className="cell-cast">{movie.cast}</div>
            <div className="cell-country">{movie.country}</div>
            <div className="cell-year">{movie.year}</div>
            <div className="cell-rating">{movie.rating}</div>
            <div className="cell-duration">{movie.duration}</div>
            <div className="cell-description">{movie.description}</div>
            <div className="cell-genre">{movie.genre}</div>
            <div className="cell-action">
              <div className="action-buttons">
                <button
                  className="edit-button"
                  onClick={() => onEdit(movie.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(movie.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
