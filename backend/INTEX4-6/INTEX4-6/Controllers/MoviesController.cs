﻿using System.ComponentModel.DataAnnotations.Schema;
using INTEX4_6.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace INTEX4_6.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private MovieDbContext _context;

        public MoviesController(MovieDbContext temp)
        {
            _context = temp;
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
        public IActionResult GetAllMoviesWithGenres()
        {
            var movies = _context.Movies.Take(100).ToList();

            var result = movies.Select(m => new MovieDto
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
                Genre = string.Join(", ", GetGenresFromBooleans(m))


            }).ToList();

            return Ok(result);
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
        [HttpGet("details/{id}")]
        public IActionResult GetMovieDetails(string id)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.ShowId == id);

            if (movie == null)
            {
                return NotFound(new { message = $"Movie with ID {id} not found." });
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


    }
}