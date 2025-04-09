import React, { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/Movie";
import AdminMovieTable from "../components/AdminMovieTable";
import MovieFormModal from "../components/MovieFormModal";
import { toast } from "react-hot-toast";

const AdminMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(500); // Show 10 movies per page
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchMoviesList(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchMoviesList(prevPage);
    }
  };


const fetchMoviesList = async (page = 1) => {
  try {
    setLoading(true);
    const response = await axios.get(
      "https://localhost:5130/Movies/withGenres",
      {
        params: { pageNum: page, pageSize },
      }
    );

    setMovies(response.data.movies);
    setTotalMovies(response.data.totalMovies);
    setTotalPages(Math.ceil(response.data.totalMovies / pageSize));
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    toast.error("Failed to load movies.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchMoviesList();
  }, []);

  const handleAddMovie = () => {
    setEditingMovie(null); // Create new
    setIsModalOpen(true);
  };

  const handleEditMovie = (showId: string) => {
    const movieToEdit = movies.find((m) => m.showId === showId);
    if (!movieToEdit) {
      console.error("Movie not found!");
      return;
    }
    setEditingMovie(movieToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteMovie = async (showId: string) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await axios.delete(`https://localhost:5130/Movies/${showId}`);
      toast.success("Movie deleted successfully!");
      fetchMoviesList();
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error("Failed to delete movie.");
    }
  };

  const prepareMovieForSaving = (movie: Movie) => {
    const genreFlags = {
      Action: false,
      Adventure: false,
      AnimeSeriesInternationalTvShows: false,
      BritishTvShowsDocuseriesInternationalTvShows: false,
      Children: false,
      Comedies: false,
      ComediesDramasInternationalMovies: false,
      ComediesInternationalMovies: false,
      ComediesRomanticMovies: false,
      CrimeTvShowsDocuseries: false,
      Documentaries: false,
      DocumentariesInternationalMovies: false,
      Docuseries: false,
      Dramas: false,
      DramasInternationalMovies: false,
      DramasRomanticMovies: false,
      FamilyMovies: false,
      Fantasy: false,
      HorrorMovies: false,
      InternationalMoviesThrillers: false,
      InternationalTvShowsRomanticTvShowsTvDramas: false,
      KidsTv: false,
      LanguageTvShows: false,
      Musicals: false,
      NatureTv: false,
      RealityTv: false,
      Spirituality: false,
      TalkShowsTvComedies: false,
      Thrillers: false,
      TvAction: false,
      TvComedies: false,
      TvDramas: false,
    };

    movie.genre.forEach((g) => {
      if (g in genreFlags) {
        genreFlags[g as keyof typeof genreFlags] = true;
      }
    });

    const { genre, ...restOfMovie } = movie; // REMOVE genre field before sending

    return {
      ...restOfMovie,
      ...genreFlags,
    };
  };

  const handleSaveMovie = async (movie: Movie) => {
    try {
      console.log("Saving movie object:", movie);

      const completeMovie = prepareMovieForSaving(movie);

      if (editingMovie) {
        if (!completeMovie.showId) {
          completeMovie.showId = editingMovie.showId;
        }
        await axios.put(
          `https://localhost:5130/Movies/${completeMovie.showId}`,
          completeMovie
        );
        toast.success("Movie updated successfully!");
      } else {
        completeMovie.showId = Math.floor(
          Math.random() * 1000000000
        ).toString();
        await axios.post("https://localhost:5130/Movies", completeMovie);
        toast.success("Movie created successfully!");
      }

      setIsModalOpen(false);
      setEditingMovie(null);
      fetchMoviesList();
    } catch (error) {
      console.error("Failed to save movie:", error);
      toast.error("Failed to save movie.");
    }
  };

  return (
    <div className="admin-panel admin-movies-page">
      <div className="admin-header">
        <h1>Movie Management</h1>
        <button onClick={handleAddMovie}>Add New Movie</button>
      </div>
      <div className="pagination-controls">
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <AdminMovieTable
          movies={movies}
          onEdit={handleEditMovie}
          onDelete={handleDeleteMovie}
        />
      )}

      <div className="pagination-controls">
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
      </div>

      <MovieFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMovie}
        initialMovie={editingMovie}
      />
    </div>
  );
};

export default AdminMoviesPage;
