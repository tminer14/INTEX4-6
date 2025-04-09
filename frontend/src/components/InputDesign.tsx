import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/InputDesign.css";

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
}

interface InputDesignProps {
  isOpen: boolean;
  onClose: () => void;
}

function InputDesign({ isOpen, onClose }: InputDesignProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim().length > 2) {
      // Debounce search requests
      const handler = setTimeout(() => {
        searchMovies(searchTerm);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const searchMovies = async (term: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5130/Movies/search?query=${encodeURIComponent(term)}`,
        {
          withCredentials: true,
        },
      );

      const formatted = response.data.map(
        (movie: { title: string }, index: number) => {
          const cleanTitle = movie.title.replace(/[:'&!]/g, "");
          return {
            id: index,
            title: movie.title,
            imageUrl: `https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/${encodeURIComponent(cleanTitle)}.jpg`,
          };
        },
      );

      setSearchResults(formatted);
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className={`search-panel ${isOpen ? "open" : ""}`}>
      <div className="search-panel-content">
        <div className="search-panel-overlay"></div>
        <div className="search-panel-header">
          <h2 className="search-panel-title">Endless Possibilities...</h2>
        </div>
        <div className="search-container">
          <div className="search-input-container">
            <div className="search-input-actions">
              <button
                className="icon-button back-button"
                onClick={onClose}
                aria-label="Go back"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                    fill="#49454F"
                  ></path>
                </svg>
              </button>

              <div className="search-input-wrapper">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="search-input"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {searchTerm && (
                <button
                  className="icon-button clear-button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                      fill="#49454F"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
            <div className="search-divider"></div>

            <div className="search-results">
              {searchResults.length > 0 ? (
                <>
                  <div className="search-results-row">
                    {searchResults.slice(0, 3).map((movie) => (
                      <div
                        key={`top-${movie.id}`}
                        className="search-result-item"
                      >
                        <img
                          src={movie.imageUrl}
                          alt={movie.title}
                          className="search-result-image"
                        />
                        <div className="search-result-title">{movie.title}</div>
                      </div>
                    ))}
                  </div>

                  {searchResults.length > 3 && (
                    <div className="search-results-row">
                      {searchResults.slice(3, 6).map((movie) => (
                        <div
                          key={`bottom-${movie.id}`}
                          className="search-result-item"
                        >
                          <img
                            src={movie.imageUrl}
                            alt={movie.title}
                            className="search-result-image"
                          />
                          <div className="search-result-title">
                            {movie.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : searchTerm.trim().length > 2 ? (
                <div className="no-results">
                  No movies found matching "{searchTerm}"
                </div>
              ) : searchTerm.trim().length > 0 ? (
                <div className="search-hint">
                  Type at least 3 characters to search
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputDesign;
