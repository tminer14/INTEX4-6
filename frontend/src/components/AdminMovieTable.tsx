import React, { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { fetchMovies } from "../api/MoviesAPI";
import Pagination from "./Pagination";
import "../styles/AdminMovieTableScoped.css"; // <-- scoped CSS import

interface AdminMovieTableProps {
  onEdit: (showId: string) => void;
  onDelete: (showId: string) => void;
}

export const AdminMovieTable: React.FC<AdminMovieTableProps> = ({
  onEdit,
  onDelete,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageNum, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalMovies, setTotalMovies] = useState(0);
  const totalPages = Math.ceil(totalMovies / pageSize);

  useEffect(() => {
    fetchMovies(pageNum, pageSize)
      .then((data) => {
        setMovies(data.movies);
        setTotalMovies(data.totalMovies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [pageNum, pageSize]);

  return (
    <>
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
              <div className="cell-cast">
                {Array.isArray(movie.cast)
                  ? movie.cast.map((actor, idx) => <div key={idx}>{actor}</div>)
                  : movie.cast}
              </div>
              <div className="cell-country">{movie.country}</div>
              <div className="cell-year">{movie.releaseYear}</div>
              <div className="cell-rating">{movie.rating}</div>
              <div className="cell-duration">{movie.duration}</div>
              <div className="cell-description">{movie.description}</div>
              <div className="cell-genre">{movie.genre.join(", ")}</div>
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
      <div className="pagination-container">
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </>
  );
};
export default AdminMovieTable;
