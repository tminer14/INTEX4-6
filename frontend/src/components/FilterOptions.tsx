import "../styles/FilterOptions.css";

interface FilterOptionsProps {
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
}

const genres = [
  "Action",
  "Adventure",
  "Comedies",
  "Dramas",
  "Docuseries",
  "Thrillers",
  "Nature TV",
  "Children",
  "Fantasy",
  "Horror Movies",
  "Musicals",
  "Reality TV",
  "Spirituality",
  "TV Action",
  "TV Comedies",
  "TV Dramas",
];

function FilterOptions({
  selectedGenre,
  setSelectedGenre,
}: FilterOptionsProps) {
  return (
    <div className="filter-options">
      <div className="filter-icon">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter-icon"
        >
          <path
            d="M44 6H4L20 24.92V38L28 42V24.92L44 6Z"
            stroke="#F5F5F5"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
      <div className="filter-buttons">
        <select
          className="genre-dropdown"
          value={selectedGenre ?? ""}
          onChange={(e) =>
            setSelectedGenre(e.target.value === "" ? null : e.target.value)
          }
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button className="filter-button">By Rating</button>
        <button className="filter-button">By Type</button>
      </div>
    </div>
  );
}

export default FilterOptions;
