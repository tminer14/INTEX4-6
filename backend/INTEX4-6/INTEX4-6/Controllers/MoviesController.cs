using INTEX4_6.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
                .Select(m =>  m.Title )
                .ToList();
            return Ok(titles);


        }
    }
}
