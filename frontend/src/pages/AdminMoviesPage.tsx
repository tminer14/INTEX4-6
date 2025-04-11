import React, { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/Movie";
import AdminMovieTable from "../components/AdminMovieTable";
import MovieFormModal from "../components/MovieFormModal";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Pagination.css";

const AdminMoviesPage: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(500);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL =
    "https://cineniche4-6swag-ebcmanakcbdxfkgz.eastus-01.azurewebsites.net/Movies";

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // Pagination
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    fetchMoviesList(1, newPageSize);
  };

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

  const fetchMoviesList = async (page = 1, customPageSize = pageSize) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/withGenres`, {
        params: { pageNum: page, pageSize: customPageSize },
      });
      setMovies(response.data.movies);
      setTotalPages(Math.ceil(response.data.totalMovies / customPageSize));
    } catch (error) {
      toast.error("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesList();
  }, []);

  const handleAddMovie = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };

  const handleEditMovie = (showId: string) => {
    const movieToEdit = movies.find((m) => m.showId === showId);
    if (!movieToEdit) return;
    setEditingMovie(movieToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteMovie = async (showId: string) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await axios.delete(`${API_URL}/${showId}`);
      toast.success("Movie deleted successfully!");
      fetchMoviesList();
    } catch (error) {
      toast.error("Failed to delete movie.");
    }
  };

  const prepareMovieForSaving = (movie: Movie) => {
    const genreFlags = {
      Action: 0,
      Adventure: 0,
      AnimeSeriesInternationalTvShows: 0,
      BritishTvShowsDocuseriesInternationalTvShows: 0,
      Children: 0,
      Comedies: 0,
      ComediesDramasInternationalMovies: 0,
      ComediesInternationalMovies: 0,
      ComediesRomanticMovies: 0,
      CrimeTvShowsDocuseries: 0,
      Documentaries: 0,
      DocumentariesInternationalMovies: 0,
      Docuseries: 0,
      Dramas: 0,
      DramasInternationalMovies: 0,
      DramasRomanticMovies: 0,
      FamilyMovies: 0,
      Fantasy: 0,
      HorrorMovies: 0,
      InternationalMoviesThrillers: 0,
      InternationalTvShowsRomanticTvShowsTvDramas: 0,
      KidsTv: 0,
      LanguageTvShows: 0,
      Musicals: 0,
      NatureTv: 0,
      RealityTv: 0,
      Spirituality: 0,
      TalkShowsTvComedies: 0,
      Thrillers: 0,
      TvAction: 0,
      TvComedies: 0,
      TvDramas: 0,
    };

    movie.genres.forEach((g) => {
      if (g in genreFlags) {
        genreFlags[g as keyof typeof genreFlags] = 1;
      }
    });

    const { genres, ...restOfMovie } = movie;
    return { ...restOfMovie, ...genreFlags };
  };

  const handleSaveMovie = async (movie: Movie) => {
    try {
      let completeMovie = prepareMovieForSaving(movie);
      if (!completeMovie.showId || completeMovie.showId.trim() === "") {
        completeMovie.showId = Math.floor(
          Math.random() * 1000000000
        ).toString();
      }

      if (editingMovie) {
        await axios.put(`${API_URL}/${completeMovie.showId}`, completeMovie);
        toast.success("Movie updated successfully!");
      } else {
        await axios.post(`${API_URL}/create`, completeMovie);
        toast.success("Movie created successfully!");
      }

      setIsModalOpen(false);
      setEditingMovie(null);
      fetchMoviesList();
    } catch (error) {
      toast.error("Failed to save movie.");
    }
  };

  return (
    <div className="admin-panel admin-movies-page">
      <header className="admin-header">
        <div className="logo-container">
          <div className="logo-text">{/* Logo SVG goes here */}</div>
          <button className="back-arrow" onClick={() => navigate("/admin")}>
            <FaArrowLeft className="arrow-icon" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <div className="header-actions">
          <div className="language-selector">Language</div>
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </header>

      {/* ADD MOVIE BUTTON */}
      <div
        className="add-movie-button-container"
        style={{ textAlign: "center", margin: "20px" }}
      >
        <button onClick={handleAddMovie} className="add-movie-button">
          ➕ Add New Movie
        </button>
      </div>

      {/* PAGINATION (Top) */}
      <div className="pagination-container">
        <div className="pagination-buttons">
          <button disabled={currentPage === 1} onClick={handlePreviousPage}>
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => {
                setCurrentPage(index + 1);
                fetchMoviesList(index + 1);
              }}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
        <label htmlFor="pageSizeSelect">
          Results per page:
          <select
            id="pageSizeSelect"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
        </label>
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

      {/* PAGINATION (Bottom) */}
      <div className="pagination-container">
        <div className="pagination-buttons">
          <button disabled={currentPage === 1} onClick={handlePreviousPage}>
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => {
                setCurrentPage(index + 1);
                fetchMoviesList(index + 1);
              }}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
        <label htmlFor="pageSizeSelectBottom">
          Results per page:
          <select
            id="pageSizeSelectBottom"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
        </label>
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
