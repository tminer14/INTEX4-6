const MovieSectionLoader = () => {
  return (
    <div className="movie-section-loading">
      <div className="skeleton-title"></div>
      <div className="skeleton-grid">
        {[...Array(5)].map((_, i) => (
          <div className="skeleton-card" key={i}></div>
        ))}
      </div>
    </div>
  );
};

export default MovieSectionLoader;
