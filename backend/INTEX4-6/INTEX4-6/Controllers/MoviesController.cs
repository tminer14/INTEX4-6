using System.ComponentModel.DataAnnotations.Schema;
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
    }
}
