using System.ComponentModel.DataAnnotations.Schema;
using INTEX4_6.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;


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

        private void MapGenresToInts(Movie movie, List<string> genres)
        {
            var genreMap = new Dictionary<string, Action<bool>>
            {
                { "Action", value => movie.Action = value ? 1 : 0 },
                { "Adventure", value => movie.Adventure = value ? 1 : 0 },
                { "Anime Series International TV Shows", value => movie.AnimeSeriesInternationalTvShows = value ? 1 : 0 },
                { "British TV Shows Docuseries International TV Shows", value => movie.BritishTvShowsDocuseriesInternationalTvShows = value ? 1 : 0 },
                { "Children", value => movie.Children = value ? 1 : 0 },
                { "Comedies", value => movie.Comedies = value ? 1 : 0 },
                { "Comedies Dramas International Movies", value => movie.ComediesDramasInternationalMovies = value ? 1 : 0 },
                { "Comedies International Movies", value => movie.ComediesInternationalMovies = value ? 1 : 0 },
                { "Comedies Romantic Movies", value => movie.ComediesRomanticMovies = value ? 1 : 0 },
                { "Crime TV Shows Docuseries", value => movie.CrimeTvShowsDocuseries = value ? 1 : 0 },
                { "Documentaries", value => movie.Documentaries = value ? 1 : 0 },
                { "Documentaries International Movies", value => movie.DocumentariesInternationalMovies = value ? 1 : 0 },
                { "Docuseries", value => movie.Docuseries = value ? 1 : 0 },
                { "Dramas", value => movie.Dramas = value ? 1 : 0 },
                { "Dramas International Movies", value => movie.DramasInternationalMovies = value ? 1 : 0 },
                { "Dramas Romantic Movies", value => movie.DramasRomanticMovies = value ? 1 : 0 },
                { "Family Movies", value => movie.FamilyMovies = value ? 1 : 0 },
                { "Fantasy", value => movie.Fantasy = value ? 1 : 0 },
                { "Horror Movies", value => movie.HorrorMovies = value ? 1 : 0 },
                { "International Movies Thrillers", value => movie.InternationalMoviesThrillers = value ? 1 : 0 },
                { "International TV Shows Romantic TV Shows TV Dramas", value => movie.InternationalTvShowsRomanticTvShowsTvDramas = value ? 1 : 0 },
                { "Kids' TV", value => movie.KidsTv = value ? 1 : 0 },
                { "Language TV Shows", value => movie.LanguageTvShows = value ? 1 : 0 },
                { "Musicals", value => movie.Musicals = value ? 1 : 0 },
                { "Nature TV", value => movie.NatureTv = value ? 1 : 0 },
                { "Reality TV", value => movie.RealityTv = value ? 1 : 0 },
                { "Spirituality", value => movie.Spirituality = value ? 1 : 0 },
                { "Talk Shows TV Comedies", value => movie.TalkShowsTvComedies = value ? 1 : 0 },
                { "Thrillers", value => movie.Thrillers = value ? 1 : 0 },
                { "TV Action", value => movie.TvAction = value ? 1 : 0 },
                { "TV Comedies", value => movie.TvComedies = value ? 1 : 0 },
                { "TV Dramas", value => movie.TvDramas = value ? 1 : 0 },
            };

            foreach (var setter in genreMap.Values)
            {
                setter(false);
            }

            foreach (var genre in genres)
            {
                if (genreMap.ContainsKey(genre))
                {
                    genreMap[genre](true);
                }
            }
        }

        private List<string> BuildGenreListFromInts(Movie movie)
        {
            var genres = new List<string>();

            var genreProperties = typeof(Movie)
                .GetProperties()
                .Where(prop => (prop.PropertyType == typeof(int) || prop.PropertyType == typeof(int?)) &&
                               prop.GetCustomAttributes(typeof(ColumnAttribute), false).FirstOrDefault() is ColumnAttribute);

            foreach (var prop in genreProperties)
            {
                object rawValue = prop.GetValue(movie);
                if (rawValue is int i && i == 1)
                {
                    var columnAttr = (ColumnAttribute)prop.GetCustomAttributes(typeof(ColumnAttribute), false).First();
                    genres.Add(columnAttr.Name);
                }
            }

            return genres;
        }

        [HttpGet("titles")]
        public IActionResult GetTitles()
        {
            var titles = _context.Movies.Select(m => m.Title).ToList();
            return Ok(titles);
        }

        [HttpGet("withGenres")]
        public async Task<IActionResult> GetMoviesWithGenres(int pageNum = 1, int pageSize = 50)
        {
            var query = _context.Movies.AsQueryable();
            var totalMovies = await query.CountAsync();
            var movieEntities = await query.Skip((pageNum - 1) * pageSize).Take(pageSize).ToListAsync();

            var moviesWithGenres = movieEntities.Select(m => new
            {
                m.ShowId,
                m.Type,
                m.Title,
                m.Director,
                m.Cast,
                m.Country,
                m.ReleaseYear,
                m.Rating,
                m.Duration,
                m.Description,
                Genre = BuildGenreListFromInts(m)
            }).ToList();

            var pageResult = new
            {
                TotalMovies = totalMovies,
                Movies = moviesWithGenres
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
        
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string title)
        {
            if (string.IsNullOrEmpty(title))
            {
                return BadRequest("Title is required.");
            }

            var matchedMovies = _context.Movies
                .Where(m => m.Title == title) // exact match
                .Select(m => new {
                    m.ShowId,
                    m.Title,
                    ImageUrl = $"https://intexmovies.blob.core.windows.net/posters/Movie%20Posters/{m.Title}.jpg" // <- Constructed URL,
                })
                .ToList();

            return Ok(matchedMovies);
        }

        [HttpGet("movieBasedRecommendations/{title}")]
        public IActionResult GetMovieBasedRecommendations(string title)
        {

            var recommendations = _context.MovieBasedRecs
                .Where(rec => rec.title == title)
                .Join(
                    _context.Movies,
                    rec => rec.title,
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
                 
                    }
                )
       
                .ToList();

            return Ok(recommendations);
        }

        [HttpPost]
        public IActionResult CreateMovie([FromBody] Movie movie)
        {
            if (movie == null)
            {
                return BadRequest();
            }

            _context.Movies.Add(movie);
            _context.SaveChanges();
            return Ok(movie);
        }

        [HttpPut("{showId}")]
        public IActionResult UpdateMovie(string showId, [FromBody] Movie updatedMovie)
        {
            var existingMovie = _context.Movies.FirstOrDefault(m => m.ShowId == showId);
            if (existingMovie == null)
            {
                return NotFound();
            }
            if (showId != updatedMovie.ShowId)
            {
                return BadRequest();
            }

            // Update fields
            existingMovie.Title = updatedMovie.Title;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.Cast = updatedMovie.Cast;
            existingMovie.Country = updatedMovie.Country;
            existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
            existingMovie.Rating = updatedMovie.Rating;
            existingMovie.Duration = updatedMovie.Duration;
            existingMovie.Description = updatedMovie.Description;
            existingMovie.Type = updatedMovie.Type;

            // TODO: Update genre booleans if needed
            _context.SaveChanges();
            return Ok(existingMovie);
        }


        [HttpDelete("{showId}")]
        public IActionResult DeleteMovie(string showId)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.ShowId == showId);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            _context.SaveChanges();
            return Ok();
        }
    }
}
