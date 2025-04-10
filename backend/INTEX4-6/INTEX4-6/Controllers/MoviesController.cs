﻿using System.ComponentModel.DataAnnotations.Schema;
using INTEX4_6.Data;
using Microsoft.AspNetCore.Http;
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

            if (movie.Action == 1) genres.Add("Action");
            if (movie.Adventure == 1) genres.Add("Adventure");
            if (movie.AnimeSeriesInternationalTvShows == 1) genres.Add("Anime Series International TV Shows");
            if (movie.BritishTvShowsDocuseriesInternationalTvShows == 1) genres.Add("British TV Shows Docuseries International TV Shows");
            if (movie.Children == 1) genres.Add("Children");
            if (movie.Comedies == 1) genres.Add("Comedies");
            if (movie.ComediesDramasInternationalMovies == 1) genres.Add("Comedies Dramas International Movies");
            if (movie.ComediesInternationalMovies == 1) genres.Add("Comedies International Movies");
            if (movie.ComediesRomanticMovies == 1) genres.Add("Comedies Romantic Movies");
            if (movie.CrimeTvShowsDocuseries == 1) genres.Add("Crime TV Shows Docuseries");
            if (movie.Documentaries == 1) genres.Add("Documentaries");
            if (movie.DocumentariesInternationalMovies == 1) genres.Add("Documentaries International Movies");
            if (movie.Docuseries == 1) genres.Add("Docuseries");
            if (movie.Dramas == 1) genres.Add("Dramas");
            if (movie.DramasInternationalMovies == 1) genres.Add("Dramas International Movies");
            if (movie.DramasRomanticMovies == 1) genres.Add("Dramas Romantic Movies");
            if (movie.FamilyMovies == 1) genres.Add("Family Movies");
            if (movie.Fantasy == 1) genres.Add("Fantasy");
            if (movie.HorrorMovies == 1) genres.Add("Horror Movies");
            if (movie.InternationalMoviesThrillers == 1) genres.Add("International Movies Thrillers");
            if (movie.InternationalTvShowsRomanticTvShowsTvDramas == 1) genres.Add("International TV Shows Romantic TV Shows TV Dramas");
            if (movie.KidsTv == 1) genres.Add("Kids' TV");
            if (movie.LanguageTvShows == 1) genres.Add("Language TV Shows");
            if (movie.Musicals == 1) genres.Add("Musicals");
            if (movie.NatureTv == 1) genres.Add("Nature TV");
            if (movie.RealityTv == 1) genres.Add("Reality TV");
            if (movie.Spirituality == 1) genres.Add("Spirituality");
            if (movie.TalkShowsTvComedies == 1) genres.Add("Talk Shows TV Comedies");
            if (movie.Thrillers == 1) genres.Add("Thrillers");
            if (movie.TvAction == 1) genres.Add("TV Action");
            if (movie.TvComedies == 1) genres.Add("TV Comedies");
            if (movie.TvDramas == 1) genres.Add("TV Dramas");

            return genres;
        }

        private List<string> GetGenresFromInts(Movie movie)
        {
            var genres = new List<string>();

            var genreProperties = typeof(Movie)
                .GetProperties()
                .Where(prop => (prop.PropertyType == typeof(int) || prop.PropertyType == typeof(int?)) &&
                               prop.GetCustomAttributes(typeof(ColumnAttribute), false).FirstOrDefault() is ColumnAttribute);

            foreach (var prop in genreProperties)
            {
                object rawValue = prop.GetValue(movie);
                bool isGenreTrue = rawValue is int i && i == 1;

                if (isGenreTrue)
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
            var titles = _context.Movies
                .Select(m => m.Title)
                .ToList();
            return Ok(titles);


        }

        [HttpGet("withGenres")]
        public async Task<IActionResult> GetMoviesWithGenres(int pageNum = 1, int pageSize = 50)
        {
            var query = _context.Movies.AsQueryable();

            var totalMovies = await query.CountAsync();

            var movieEntities = await query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

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
                Genre = BuildGenreListFromInts(m)  // <--- this magic!
            }).ToList();

            var pageResult = new
            {
                TotalMovies = totalMovies,
                Movies = moviesWithGenres
            };
            Console.WriteLine("Fetched Movies Count: " + movieEntities.Count);
            Console.WriteLine("Movies With Genres Count: " + moviesWithGenres.Count);

            return Ok(pageResult);
        }

        //pulling genres from booleans
        private List<string> GetGenresFromBooleans(Movie movie)
        {
            var genres = new List<string>();

            var genreProperties = typeof(Movie)
                .GetProperties()
                .Where(prop =>
                    (prop.PropertyType == typeof(bool) || prop.PropertyType == typeof(bool?)) &&
                    prop.GetCustomAttributes(typeof(ColumnAttribute), false).FirstOrDefault() is ColumnAttribute);

            foreach (var prop in genreProperties)
            {
                object rawValue = prop.GetValue(movie);

                Console.WriteLine($"Prop: {prop.Name}, Type: {prop.PropertyType}, Value: {rawValue}");

                bool isGenreTrue = rawValue is bool b && b;

                if (isGenreTrue)
                {
                    var columnAttr = (ColumnAttribute)prop.GetCustomAttributes(typeof(ColumnAttribute), false).First();
                    genres.Add(columnAttr.Name);
                }
            }

            return genres;
        }


        // Route to pass the top-rated movies into our user dashboard 
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

        // to view the details of each movie! 
        [HttpGet("details/{title}")]
        public IActionResult GetMovieDetails(string title)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.Title == title);

            if (movie == null)
            {
                return NotFound(new { message = $"Movie with ID {title} not found." });
            }

            return Ok(movie);
        }

        [HttpGet("userBasedRecommendations/{id}")]
        public IActionResult GetUserBasedRecommendations(string id)
        {
            if (!int.TryParse(id, out int userId))
            {
                return BadRequest(new { message = "Invalid user ID format." });
            }

            var recommendations = _context.UserBasedRecs
                .Where(r => r.user_id == userId)
                .Where(r => r.recommendation_type == "top_picks")
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
                        rec.rank,
                        rec.recommendation_type
                    }
                )
                .OrderBy(r => r.rank)
                .ToList();

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