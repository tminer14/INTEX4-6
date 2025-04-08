import "../styles/FeaturedMovies.css";

// Placeholder URLs for movie posters
// In a real application, these would come from an API or props
const moviePosters = [
  { id: 1, url: "https://cdn.builder.io/api/v1/image/assets/TEMP/e81eb9e6ac8ff0afa094003a3b32d64f6ed68b20", title: "3 Türken ein Baby" },
  { id: 2, url: "https://cdn.builder.io/api/v1/image/assets/TEMP/93e394d804439ad219c21c32d281e0b3f00fff6a", title: "3 Seconds Divorce" },
  { id: 3, url: "https://cdn.builder.io/api/v1/image/assets/TEMP/45d3bd92c05b5c1ad7cd33c5303792bd712886d7", title: "3 Idiots" },
  { id: 10, url: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa4801894551a609050f0205d67b03988dd74b57", title: "3 Heroines" },
  { id: 11, url: "https://cdn.builder.io/api/v1/image/assets/TEMP/84e2bc9ab16adbae5a2dbe96d721032f01f7809a", title: "3 Generations" },
  { id: 12, url: "https://cdn.builder.io/api/v1/image/assets/TEMP/808bda53d66392b1ed0a18eb571263629c498874", title: "3 Deewarein" },
];

function FeaturedMovies() {
  return (
    <section className="featured-movies-container">
      <div className="featured-movies-content">
        <h2 className="featured-title">Yours To Discover</h2>
        <div className="movie-posters-container">
          {moviePosters.map((movie) => (
            <img
              key={movie.id}
              src={movie.url}
              alt={movie.title}
              className="movie-poster"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedMovies;
