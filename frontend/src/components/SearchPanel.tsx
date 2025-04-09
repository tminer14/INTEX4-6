import React, { useEffect, useRef, useState } from "react";
import "../styles/SearchPanel.css";
import { Link } from "react-router-dom";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MovieItem {
  showId: string;
  title: string;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ isOpen, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieItem[]>([]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:5130/Movies/search?title=${encodeURIComponent(query)}`
      );
      const data: MovieItem[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const getImageUrl = (title: string) => {
    // Step 1: Remove problematic characters (like : ' " ? etc.)
    const sanitized = title.replace(/[:'"?&]/g, "");

    // Step 2: Encode the cleaned title to make it URL-safe
    const encodedTitle = encodeURIComponent(sanitized);

    // Step 3: Construct the full image URL
    return `https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/${encodedTitle}.jpg`;
  };

  return (
    <div className={`search-panel-overlay ${isOpen ? "open" : ""}`}>
      <div
        ref={panelRef}
        className={`search-panel-container ${isOpen ? "open" : ""}`}
      >
        <div className="search-panel-content">
          <div className="search-panel-header">
            <div className="search-title">Endless Possibilities...</div>
            <div className="search-panel">
              <div className="search-input-container">
                <button className="icon-button back-button" onClick={onClose}>
                  ←
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  className="search-input"
                  placeholder="Search for a movie..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
                <button className="icon-button close-button" onClick={onClose}>
                  ✕
                </button>
              </div>
              <div className="search-divider"></div>
              <div className="search-results">
                {results.length > 0 ? (
                  <div className="movie-row">
                    {results.map((movie) => (
                      <Link
                        to={`/Movies/details/${encodeURIComponent(movie.title)}`}
                        key={movie.showId}
                        className="movie-item"
                        onClick={onClose} // Optional: close search panel on click
                      >
                        <img
                          src={getImageUrl(movie.title)}
                          alt={movie.title}
                          className="movie-poster"
                        />
                        <div className="movie-title">{movie.title}</div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <p>No results yet. Try searching!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
