import "../styles/AdminMovieTableScoped.css"; // scoped CSS
import React from "react";
import { Movie } from "../types/Movie";

interface AdminMovieTableProps {
  movies: Movie[];
  onEdit: (showId: string) => void;
  onDelete: (showId: string) => void;
}

const AdminMovieTable: React.FC<AdminMovieTableProps> = ({
  movies,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="admin-movie-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Title</th>
            <th>Director</th>
            <th>Cast</th>
            <th>Country</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies?.length > 0 ? (
            movies.map((movie) => (
              <tr key={movie.showId}>
                <td>{movie.showId}</td>
                <td>{movie.type}</td>
                <td>{movie.title}</td>
                <td>{movie.director}</td>
                <td>{movie.cast}</td>
                <td>{movie.country}</td>
                <td>{movie.releaseYear}</td>
                <td>{movie.rating}</td>
                <td>{movie.duration}</td>
                <td>{movie.description}</td>
                <td>{movie.genre?.length ? movie.genre.join(", ") : "—"}</td>
                <td>
                  <button onClick={() => onEdit(movie.showId)}>Edit</button>
                  <button onClick={() => onDelete(movie.showId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12}>No movies found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMovieTable;
