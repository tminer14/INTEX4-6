import React, { useEffect, useState } from "react";
import { Movie } from "../types/Movie";

interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (movie: Movie) => void;
  initialMovie: Movie | null;
}

const allGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Children",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "International",
  "Romance",
  "Reality",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western",
  "Musical",
  "TV Show",
];

const MovieFormModal: React.FC<MovieFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialMovie,
}) => {
  const [formMovie, setFormMovie] = useState<Movie>({
    showId: "",
    type: "",
    title: "",
    director: "",
    cast: "",
    country: "",
    releaseYear: "",
    rating: "",
    duration: "",
    description: "",
    genre: [],
  });

  useEffect(() => {
    if (initialMovie) {
      setFormMovie(initialMovie);
    }
  }, [initialMovie]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormMovie({ ...formMovie, [name]: value });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormMovie({ ...formMovie, genre: selected });
  };

  const handleSubmit = () => {
    onSave(formMovie);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initialMovie ? "Edit Movie" : "Add Movie"}</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formMovie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formMovie.type}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={formMovie.director}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cast"
          placeholder="Cast"
          value={formMovie.cast}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formMovie.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="releaseYear"
          placeholder="Release Year"
          value={formMovie.releaseYear}
          onChange={handleChange}
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating"
          value={formMovie.rating}
          onChange={handleChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formMovie.duration}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formMovie.description}
          onChange={handleChange}
        />

        <label>Genres (multi-select):</label>
        <select multiple value={formMovie.genre} onChange={handleGenreChange}>
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default MovieFormModal;
