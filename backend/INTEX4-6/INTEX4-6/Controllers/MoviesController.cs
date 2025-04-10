using System.ComponentModel.DataAnnotations.Schema;
using INTEX4_6.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace INTEX4_6.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MovieDbContext _context;

        public MoviesController(MovieDbContext context)
        {
            _context = context;
        }

        [HttpGet("titles")]
        public IActionResult GetTitles()
        {
            var titles = _context.Movies
                .Select(m => m.Title)
                .ToList();

            return Ok(titles);
        }

        [HttpGet("all")]
        public IActionResult GetAllMovies()
        {
            var count = _context.Movies.Count();
            Console.WriteLine($"📊 Count of movies: {count}");

            var movies = _context.Movies.Take(5).ToList();

            foreach (var movie in movies)
            {
                Console.WriteLine($"🎬 {movie.ShowId} | {movie.Title}");
            }

            return Ok(movies);
        }

        [HttpGet("withGenres")]
        public IActionResult GetAllMoviesWithGenres(int pageSize = 25, int pageNum = 1)
        {
            if (pageNum <= 0 || pageSize <= 0)
            {
                return BadRequest("Page number and page size must be greater than 0.");
            }

            var query = _context.Movies.AsQueryable().OrderBy(m => m.Title);

            var totalMovies = query.Count();

            var pagedMovies = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = pagedMovies.Select(m => new MovieDto
            {
                ShowId = m.ShowId,
                Type = m.Type,
                Title = m.Title,
                Director = m.Director,
                Cast = m.Cast,
                Country = m.Country,
                ReleaseYear = m.ReleaseYear,
                Rating = m.Rating,
                Duration = m.Duration,
                Description = m.Description,
                Genre = GetGenresFromBooleans(m)
            }).ToList();

            var pageResult = new
            {
                TotalMovies = totalMovies,
                Movies = result
            };

            return Ok(pageResult);
        }

        private List<string> GetGenresFromBooleans(Movie movie)
        {
            var genres = new List<string>();

            var genreProperties = typeof(Movie)
                .GetProperties()
                .Where(prop =>
                    (prop.PropertyType == typeof(int) || prop.PropertyType == typeof(int?)) &&
                    prop.GetCustomAttributes(typeof(ColumnAttribute), false).FirstOrDefault() is ColumnAttribute);

            foreach (var prop in genreProperties)
            {
                var value = prop.GetValue(movie);
                bool isGenre = value is int i && i > 0;

                if (isGenre)
                {
                    var columnAttr = (ColumnAttribute)prop.GetCustomAttributes(typeof(ColumnAttribute), false).First();
                    genres.Add(columnAttr.Name);
                }
            }

            return genres;
        }

        [HttpGet("top-rated")]
        public IActionResult GetTopRatedMovies()
        {
            var topMovies = _context.TopOverallRecs
                .OrderByDescending(m => m.AvgRating)
                .ThenByDescending(m => m.NumRatings)
                .Take(10)
                .ToList();

            return Ok(topMovies);
        }

        [HttpGet("details/{title}")]
        public IActionResult GetMovieDetails(string title)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.Title == title);

            if (movie == null)
            {
                return NotFound(new { message = $"Movie with title '{title}' not found." });
            }

            return Ok(movie);
        }

        [HttpGet("userBasedRecommendations/{id}")]
        public IActionResult GetUserBasedRecommendations(int id)
        {
            var recommendations = _context.UserBasedRecs
                .Where(r => r.UserId == id && r.RecommendationType == "top_picks")
                .Join(
                    _context.Movies,
                    rec => rec.Title,
                    movie => movie.Title,
                    (rec, movie) => new
                    {
                        movie.ShowId,
                        movie.Title,
                        movie.Director,
                        movie.Cast,
                        movie.Country,
                        movie.ReleaseYear,
                        movie.Rating,
                        movie.Duration,
                        movie.Description,
                        rec.Rank,
                        rec.RecommendationType
                    }
                )
                .OrderBy(r => r.Rank)
                .ToList();

            Console.WriteLine($"🎯 Returning {recommendations.Count} matched movies");

            return Ok(recommendations);
        }



        [HttpGet("recentMovies")]
        public IActionResult GetRecentMovies()
        {
            var recentMovies = _context.Movies
                .OrderByDescending(m => m.ReleaseYear)
                .Take(20)
                .ToList();

            return Ok(recentMovies);
        }
    }
}
