import React, { useEffect, useRef } from "react";
import "../styles/SearchPanel.css";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MovieItem {
  id: number;
  title: string;
  imageUrl: string;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ isOpen, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample movie data - in a real app, this would come from an API based on search
  const sampleMovies: MovieItem[] = [
    { id: 1, title: "Movie #1", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/d033b1624de4b0d44466749bfb39c7036a91e84e" },
    { id: 2, title: "Movie #1", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/763992010bb8380fac9bf11d7b05faa733c14f0c" },
    { id: 3, title: "Movie #1", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/87e9544aa54897840fd5bea0601c171eddd6fa27" },
    { id: 4, title: "Movie #1", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/7f32ea819dc0078240c4a318bb08621d23df56fc" },
    { id: 5, title: "Movie #1", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/10922f5787419d3a7046d64d33dc3520b5c8c59f" },
    { id: 6, title: "Movie #1", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c1796a448a1eb0ccf8e694e02247a4099d19595" },
  ];

  useEffect(() => {
    // Focus the input when the panel opens
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }

    // Add event listener for escape key
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

  // Handle click outside to close
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="back-icon"
                  >
                    <path
                      d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                      fill="#49454F"
                    ></path>
                  </svg>
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  className="search-input"
                  placeholder="Input text"
                />
                <button className="icon-button close-button" onClick={onClose}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="close-icon"
                  >
                    <path
                      d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                      fill="#49454F"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="search-divider"></div>
              <div className="search-results">
                <div className="movie-row">
                  <div className="movie-item">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d033b1624de4b0d44466749bfb39c7036a91e84e" alt="3 Idiots" className="movie-poster" />
                    <div className="movie-title">Movie #1</div>
                  </div>
                  <div className="movie-item">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/763992010bb8380fac9bf11d7b05faa733c14f0c"
                      alt="3 Heroines"
                      className="movie-poster"
                    />
                    <div className="movie-title">Movie #1</div>
                  </div>
                  <div className="movie-item">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/87e9544aa54897840fd5bea0601c171eddd6fa27"
                      alt="3 Generations"
                      className="movie-poster"
                    />
                    <div className="movie-title">Movie #1</div>
                  </div>
                </div>
                <div className="movie-row">
                  <div className="movie-item">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f32ea819dc0078240c4a318bb08621d23df56fc"
                      alt="3 Deewarein"
                      className="movie-poster"
                    />
                    <div className="movie-title">Movie #1</div>
                  </div>
                  <div className="movie-item">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/10922f5787419d3a7046d64d33dc3520b5c8c59f"
                      alt="3 Days to Kill"
                      className="movie-poster"
                    />
                    <div className="movie-title">Movie #1</div>
                  </div>
                  <div className="movie-item">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c1796a448a1eb0ccf8e694e02247a4099d19595"
                      alt="2 Weeks in Lagos"
                      className="movie-poster"
                    />
                    <div className="movie-title">Movie #1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
