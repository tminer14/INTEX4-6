import { useEffect, useRef } from "react";
import "../styles/AutoScrollMovies.css";
import PosterNotFound from "../assets/PosterNotFound.webp";

interface Movie {
  id: string;
  title: string;
  imageUrl: string;
}

interface AutoScrollMoviesProps {
  title: string;
  movies: Movie[];
}

function AutoScrollMovies({ title, movies }: AutoScrollMoviesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate movies array for infinite scroll effect
  const duplicatedMovies = [...movies, ...movies, ...movies];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (!scrollContainer) return;

      scrollPosition += scrollSpeed;

      // Reset scroll position when we've scrolled through the first set of movies
      if (scrollPosition >= movies.length * 254) {
        // 220px width + 34px gap
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    // Pause scrolling when user hovers over the container
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [movies.length]);

  return (
    <div className="auto-scroll-container">
      <div className="auto-scroll-content">
        <h2 className="auto-scroll-title">{title}</h2>
        <div className="movie-posters-scroll" ref={scrollRef}>
          {duplicatedMovies.map((movie, index) => (
            <div key={`${movie.id}-${index}`} className="movie-poster-link">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="auto-scroll-movie-poster"
                onError={(e) => {
                  e.currentTarget.onerror = null; // prevent infinite loop
                  e.currentTarget.src = PosterNotFound;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AutoScrollMovies;
