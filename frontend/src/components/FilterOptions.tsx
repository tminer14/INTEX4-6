import "../styles/FilterOptions.css";

function FilterOptions() {
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
        <button className="filter-button">By Genre</button>
        <button className="filter-button">By Rating</button>
        <button className="filter-button">By Type</button>
      </div>
    </div>
  );
}

export default FilterOptions;
