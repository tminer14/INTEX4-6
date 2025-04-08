import React, { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { fetchMovies } from "../api/MoviesAPI";

interface AdminMovieTableProps {
  onEdit: (showId: string) => void;
  onDelete: (showId: string) => void;
}

export const AdminMovieTable: React.FC<AdminMovieTableProps> = ({

  onEdit,
  onDelete,
}) => {
 const [movies, setMovies] = useState<Movie[]>([]);
 useEffect(() => {
  fetchMovies()
  .then(setMovies)
  .catch((error) => {
    console.error("Error fetching movies:", error);
  });
 }, [])



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
          <div className="table-row" key={`${movie.showId}-${index}`}>
            <div className="cell-id">{movie.showId}</div>
            <div className="cell-type">{movie.type}</div>
            <div className="cell-title">{movie.title}</div>
            <div className="cell-director">{movie.director}</div>
            <div className="cell-cast">{movie.cast}</div>
            <div className="cell-country">{movie.country}</div>
            <div className="cell-year">{movie.releaseYear}</div>
            <div className="cell-rating">{movie.rating}</div>
            <div className="cell-duration">{movie.duration}</div>
            <div className="cell-description">{movie.description}</div>
            <div className="cell-genre">{movie.genre}</div>
            <div className="cell-action">
              <div className="action-buttons">
                <button
                  className="edit-button"
                  onClick={() => onEdit(movie.showId)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(movie.showId)}
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
