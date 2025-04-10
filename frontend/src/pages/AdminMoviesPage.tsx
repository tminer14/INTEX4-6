import React, { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/Movie";
import AdminMovieTable from "../components/AdminMovieTable";
import MovieFormModal from "../components/MovieFormModal";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminMoviesPage: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(500); // Show 10 movies per page
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    console.log("Sign out clicked");
    navigate("/");
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

    movie.genre.forEach((g) => {
      if (g in genreFlags) {
        genreFlags[g as keyof typeof genreFlags] = 1;
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
      <header className="admin-header">
                    <div className="logo-container">
                      <div className="logo-text">
                        <svg
                          id="86:341"
                          layer-name="Logo"
                          width="229"
                          height="69"
                          viewBox="0 0 229 69"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="logo-text"
                          style={{ width: "229px", height: "69px" }}
                        >
                          <path
                            d="M34.6058 29.1319H27.793C27.5378 27.3758 26.7935 25.9958 25.5603 24.9919C24.3246 23.9904 22.786 23.4873 20.9421 23.4873C18.4732 23.4873 16.4957 24.3953 15.0072 26.209C13.5235 28.025 12.784 30.5982 12.784 33.9332C12.784 37.3448 13.5306 39.9395 15.0263 41.7148C16.5195 43.4925 18.4756 44.379 20.8944 44.379C22.6882 44.379 24.2054 43.9094 25.4458 42.9702C26.691 42.0263 27.4734 40.699 27.793 38.9932L34.6058 39.0219C34.3696 40.9769 33.6755 42.8217 32.5257 44.5515C31.3735 46.2765 29.8087 47.6757 27.8312 48.749C25.8585 49.8223 23.5112 50.359 20.7894 50.359C17.946 50.359 15.4079 49.7145 13.1752 48.4232C10.9424 47.1342 9.17962 45.2655 7.88911 42.8169C6.59621 40.3708 5.95215 37.4095 5.95215 33.9332C5.95215 30.4448 6.60337 27.4788 7.90819 25.0302C9.21778 22.5841 10.9925 20.7177 13.2324 19.4336C15.47 18.1494 17.989 17.5073 20.7894 17.5073C23.244 17.5073 25.4577 17.9649 27.4304 18.8777C29.408 19.7858 31.0229 21.1059 32.2776 22.8357C33.5371 24.5678 34.3124 26.6666 34.6058 29.1319Z"
                            fill="#F7F7FF"
                          ></path>
                          <path
                            d="M39.3145 49.9182V25.9311H45.9364V49.9182H39.3145ZM42.6445 22.8452C41.6713 22.8452 40.8316 22.517 40.1255 21.8582C39.4194 21.1945 39.0664 20.3991 39.0664 19.4719C39.0664 18.5471 39.4194 17.7565 40.1255 17.1048C40.8316 16.4484 41.6713 16.1177 42.6445 16.1177C43.6297 16.1177 44.4718 16.4484 45.1731 17.1048C45.8792 17.7565 46.2322 18.5471 46.2322 19.4719C46.2322 20.3991 45.8792 21.1945 45.1731 21.8582C44.4718 22.517 43.6297 22.8452 42.6445 22.8452Z"
                            fill="#F7F7FF"
                          ></path>
                          <path
                            d="M57.8436 36.0511V49.9181H51.2217V25.9311H57.5287V30.1669H57.815C58.3541 28.7749 59.2415 27.6704 60.4771 26.8511C61.7175 26.0341 63.2203 25.6244 64.9903 25.6244C67.4831 25.6244 69.4797 26.4294 70.9825 28.0394C72.4829 29.6446 73.2343 31.8488 73.2343 34.6519V49.9181H66.6124V35.8306C66.6243 34.3692 66.2522 33.224 65.496 32.3998C64.7374 31.5708 63.695 31.154 62.3663 31.154C61.0305 31.154 59.9451 31.5828 59.1126 32.4381C58.2777 33.2958 57.8555 34.4986 57.8436 36.0511Z"
                            fill="#F7F7FF"
                          ></path>
                          <path
                            d="M89.3178 50.3877C86.8751 50.3877 84.7664 49.887 82.9916 48.8831C81.2217 47.8745 79.862 46.4466 78.9078 44.5994C77.9536 42.7546 77.4766 40.5648 77.4766 38.0348C77.4766 35.5695 77.9536 33.4061 78.9078 31.5469C79.862 29.6829 81.2074 28.2287 82.9439 27.1865C84.6805 26.1467 86.7177 25.6244 89.0601 25.6244C91.1593 25.6244 93.0533 26.0724 94.747 26.9661C96.4454 27.8621 97.7908 29.2133 98.7831 31.0198C99.7802 32.8215 100.281 35.0831 100.281 37.8048V39.6256H84.0221V39.6448C84.0221 41.4345 84.5088 42.8456 85.482 43.8806C86.4553 44.9108 87.772 45.4236 89.4323 45.4236C90.5391 45.4236 91.4957 45.1912 92.3043 44.724C93.1106 44.252 93.6807 43.5596 94.0123 42.6444L100.138 43.0469C99.6729 45.2774 98.4921 47.0599 96.5981 48.3944C94.7017 49.7241 92.2757 50.3877 89.3178 50.3877ZM84.0221 35.5048H94.0504C94.0361 34.0817 93.5781 32.9053 92.6764 31.9781C91.7795 31.0533 90.6083 30.5886 89.1651 30.5886C87.6957 30.5886 86.4863 31.0677 85.5393 32.0261C84.597 32.9844 84.0913 34.144 84.0221 35.5048Z"
                            fill="#F7F7FF"
                          ></path>
                          <path
                            d="M131.357 17.9385V49.9181H125.546L111.692 29.7931H111.453V49.9181H104.727V17.9385H110.633L124.373 38.054H124.659V17.9385H131.357Z"
                            fill="#F7F7FF"
                          ></path>
                          <path
                            d="M136.779 49.9182V25.9311H143.401V49.9182H136.779ZM140.109 22.8452C139.136 22.8452 138.296 22.517 137.59 21.8582C136.884 21.1945 136.531 20.3991 136.531 19.4719C136.531 18.5471 136.884 17.7565 137.59 17.1048C138.296 16.4484 139.136 16.1177 140.109 16.1177C141.095 16.1177 141.937 16.4484 142.638 17.1048C143.344 17.7565 143.697 18.5471 143.697 19.4719C143.697 20.3991 143.344 21.1945 142.638 21.8582C141.937 22.517 141.095 22.8452 140.109 22.8452Z"
                            fill="#F7F7FF"
                          ></path>
                          <path
                            d="M159.478 50.3877C157.028 50.3877 154.927 49.8654 153.171 48.8161C151.415 47.7691 150.065 46.3148 149.125 44.4556C148.19 42.5917 147.723 40.4474 147.723 38.0252C147.723 35.5671 148.195 33.4061 149.144 31.5469C150.091 29.6877 151.439 28.2382 153.19 27.1961C154.946 26.1491 157.028 25.6244 159.44 25.6244C161.525 25.6244 163.354 26.0053 164.926 26.7648C166.496 27.5267 167.734 28.5928 168.638 29.9656C169.547 31.3408 170.045 32.9532 170.136 34.8052H163.886C163.714 33.6121 163.249 32.6466 162.493 31.9111C161.742 31.1779 160.761 30.809 159.554 30.809C158.021 30.809 156.787 31.4295 155.852 32.6681C154.917 33.9092 154.45 35.6629 154.45 37.9294C154.45 40.2174 154.912 41.9903 155.843 43.2481C156.771 44.5012 158.009 45.1265 159.554 45.1265C160.692 45.1265 161.649 44.7815 162.426 44.0915C163.202 43.3967 163.688 42.4096 163.886 41.1302H170.136C170.033 42.9582 169.537 44.5706 168.648 45.9698C167.763 47.3642 166.544 48.4495 164.993 49.2281C163.44 49.9996 161.601 50.3877 159.478 50.3877Z"
                            fill="#F7F7FF"
                          ></path>
                          <path
                            d="M181.019 36.051V49.9181H174.397V17.9385H180.829V30.1669H181.115C181.661 28.7485 182.532 27.6369 183.729 26.8319C184.931 26.0269 186.439 25.6244 188.252 25.6244C190.738 25.6244 192.737 26.427 194.244 28.0298C195.756 29.635 196.51 31.8416 196.506 34.6519V49.9181H189.884V35.8306C189.888 34.3548 189.516 33.2096 188.767 32.3902C188.016 31.566 186.966 31.154 185.618 31.154C184.268 31.154 183.169 31.5828 182.317 32.4381C181.463 33.2958 181.031 34.4985 181.019 36.051Z"
                            fill="#F7F7FF"
                          ></path>
                          <path
                            d="M212.602 50.3877C210.159 50.3877 208.051 49.887 206.276 48.8831C204.506 47.8745 203.146 46.4466 202.192 44.5994C201.238 42.7546 200.761 40.5648 200.761 38.0348C200.761 35.5695 201.238 33.4061 202.192 31.5469C203.146 29.6829 204.492 28.2287 206.228 27.1865C207.965 26.1467 210.002 25.6244 212.344 25.6244C214.443 25.6244 216.338 26.0724 218.031 26.9661C219.73 27.8621 221.075 29.2133 222.067 31.0198C223.064 32.8215 223.565 35.0831 223.565 37.8048V39.6256H207.306V39.6448C207.306 41.4345 207.793 42.8456 208.766 43.8806C209.739 44.9108 211.056 45.4236 212.716 45.4236C213.823 45.4236 214.78 45.1912 215.588 44.724C216.395 44.252 216.965 43.5596 217.296 42.6444L223.422 43.0469C222.957 45.2774 221.776 47.0599 219.882 48.3944C217.986 49.7241 215.56 50.3877 212.602 50.3877ZM207.306 35.5048H217.335C217.32 34.0817 216.862 32.9053 215.961 31.9781C215.064 31.0533 213.892 30.5886 212.449 30.5886C210.98 30.5886 209.77 31.0677 208.823 32.0261C207.881 32.9844 207.376 34.144 207.306 35.5048Z"
                            fill="#F7F7FF"
                          ></path>
                        </svg>
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/48acbec41f51b3a0cb299ff7a8c91f8fc3735c4e?placeholderIfAbsent=true"
                        alt=""
                        className="logo-icon"
                      />
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
