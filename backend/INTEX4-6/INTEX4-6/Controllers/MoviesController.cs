﻿using System.ComponentModel.DataAnnotations.Schema;
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

        private MovieDbContext _context;
        private void MapGenresToBooleans(Movie movie, List<string> genres)
        {
            // Step 1: Map genres to corresponding movie properties
            var genreMap = new Dictionary<string, Action<bool>>
    {
        { "Action", value => movie.Action = value },
        { "Adventure", value => movie.Adventure = value },
        { "Anime Series International TV Shows", value => movie.AnimeSeriesInternationalTvShows = value },
        { "British TV Shows Docuseries International TV Shows", value => movie.BritishTvShowsDocuseriesInternationalTvShows = value },
        { "Children", value => movie.Children = value },
        { "Comedies", value => movie.Comedies = value },
        { "Comedies Dramas International Movies", value => movie.ComediesDramasInternationalMovies = value },
        { "Comedies International Movies", value => movie.ComediesInternationalMovies = value },
        { "Comedies Romantic Movies", value => movie.ComediesRomanticMovies = value },
        { "Crime TV Shows Docuseries", value => movie.CrimeTvShowsDocuseries = value },
        { "Documentaries", value => movie.Documentaries = value },
        { "Documentaries International Movies", value => movie.DocumentariesInternationalMovies = value },
        { "Docuseries", value => movie.Docuseries = value },
        { "Dramas", value => movie.Dramas = value },
        { "Dramas International Movies", value => movie.DramasInternationalMovies = value },
        { "Dramas Romantic Movies", value => movie.DramasRomanticMovies = value },
        { "Family Movies", value => movie.FamilyMovies = value },
        { "Fantasy", value => movie.Fantasy = value },
        { "Horror Movies", value => movie.HorrorMovies = value },
        { "International Movies Thrillers", value => movie.InternationalMoviesThrillers = value },
        { "International TV Shows Romantic TV Shows TV Dramas", value => movie.InternationalTvShowsRomanticTvShowsTvDramas = value },
        { "Kids' TV", value => movie.KidsTv = value },
        { "Language TV Shows", value => movie.LanguageTvShows = value },
        { "Musicals", value => movie.Musicals = value },
        { "Nature TV", value => movie.NatureTv = value },
        { "Reality TV", value => movie.RealityTv = value },
        { "Spirituality", value => movie.Spirituality = value },
        { "Talk Shows TV Comedies", value => movie.TalkShowsTvComedies = value },
        { "Thrillers", value => movie.Thrillers = value },
        { "TV Action", value => movie.TvAction = value },
        { "TV Comedies", value => movie.TvComedies = value },
        { "TV Dramas", value => movie.TvDramas = value },
    };

            // Step 2: First, set all properties to false
            foreach (var setter in genreMap.Values)
            {
                setter(false);
            }

            // Step 3: Then set true for the genres present
            foreach (var genre in genres)
            {
                if (genreMap.ContainsKey(genre))
                {
                    genreMap[genre](true);
                }
            }
        }

        private List<string> BuildGenreListFromBooleans(Movie movie)
        {
            var genres = new List<string>();

            if (movie.Action == true) genres.Add("Action");
            if (movie.Adventure == true) genres.Add("Adventure");
            if (movie.AnimeSeriesInternationalTvShows == true) genres.Add("Anime Series International TV Shows");
            if (movie.BritishTvShowsDocuseriesInternationalTvShows == true) genres.Add("British TV Shows Docuseries International TV Shows");
            if (movie.Children == true) genres.Add("Children");
            if (movie.Comedies == true) genres.Add("Comedies");
            if (movie.ComediesDramasInternationalMovies == true) genres.Add("Comedies Dramas International Movies");
            if (movie.ComediesInternationalMovies == true) genres.Add("Comedies International Movies");
            if (movie.ComediesRomanticMovies == true) genres.Add("Comedies Romantic Movies");
            if (movie.CrimeTvShowsDocuseries == true) genres.Add("Crime TV Shows Docuseries");
            if (movie.Documentaries == true) genres.Add("Documentaries");
            if (movie.DocumentariesInternationalMovies == true) genres.Add("Documentaries International Movies");
            if (movie.Docuseries == true) genres.Add("Docuseries");
            if (movie.Dramas == true) genres.Add("Dramas");
            if (movie.DramasInternationalMovies == true) genres.Add("Dramas International Movies");
            if (movie.DramasRomanticMovies == true) genres.Add("Dramas Romantic Movies");
            if (movie.FamilyMovies == true) genres.Add("Family Movies");
            if (movie.Fantasy == true) genres.Add("Fantasy");
            if (movie.HorrorMovies == true) genres.Add("Horror Movies");
            if (movie.InternationalMoviesThrillers == true) genres.Add("International Movies Thrillers");
            if (movie.InternationalTvShowsRomanticTvShowsTvDramas == true) genres.Add("International TV Shows Romantic TV Shows TV Dramas");
            if (movie.KidsTv == true) genres.Add("Kids' TV");
            if (movie.LanguageTvShows == true) genres.Add("Language TV Shows");
            if (movie.Musicals == true) genres.Add("Musicals");
            if (movie.NatureTv == true) genres.Add("Nature TV");
            if (movie.RealityTv == true) genres.Add("Reality TV");
            if (movie.Spirituality == true) genres.Add("Spirituality");
            if (movie.TalkShowsTvComedies == true) genres.Add("Talk Shows TV Comedies");
            if (movie.Thrillers == true) genres.Add("Thrillers");
            if (movie.TvAction == true) genres.Add("TV Action");
            if (movie.TvComedies == true) genres.Add("TV Comedies");
            if (movie.TvDramas == true) genres.Add("TV Dramas");

            return genres;
        }

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
        public async Task<IActionResult> GetMoviesWithGenres(int pageNum = 1, int pageSize = 50)
        {
            var query = _context.Movies.AsQueryable();

            var totalMovies = await query.CountAsync();

            var movieEntities = await query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

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
            // Manually build the genres list from booleans
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
                Genre = BuildGenreListFromBooleans(m)  // <--- this magic!
            }).ToList();

            var pageResult = new
            {
                TotalMovies = totalMovies,
                Movies = result
            };
            Console.WriteLine("Fetched Movies Count: " + movieEntities.Count);
            Console.WriteLine("Movies With Genres Count: " + moviesWithGenres.Count);

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
