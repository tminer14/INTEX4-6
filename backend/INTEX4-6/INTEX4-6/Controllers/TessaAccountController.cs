using System.Diagnostics;
using System.Text.Json;
using INTEX4_6.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace INTEX4_6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TessaAccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly MovieDbContext _movieDbContext;

        public TessaAccountController(UserManager<IdentityUser> userManager, MovieDbContext movieDbContext)
        {
            _userManager = userManager;
            _movieDbContext = movieDbContext;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var identityUser = new IdentityUser
            {
                Email = dto.Email,
                UserName = dto.Email,
            };

            var createResult = await _userManager.CreateAsync(identityUser, dto.Password);

            if (!createResult.Succeeded)
                return BadRequest(createResult.Errors);

            await _userManager.AddToRoleAsync(identityUser, "User");

            var movieUser = new MovieUserInfo
            {
                UserId = new Random().Next(100000, 999999),
                Name = dto.Name ?? "Unknown",
                Phone = dto.Phone ?? "Unknown",
                Email = dto.Email ?? "Unknown",
                Age = dto.Age != 0 ? dto.Age : 18, // Default age if not set
                Gender = dto.Gender ?? "Unspecified",
                Netflix = dto.Netflix,
                AmazonPrime = dto.AmazonPrime,
                DisneyPlus = dto.DisneyPlus,
                ParamountPlus = dto.ParamountPlus,
                Max = dto.Max,
                Hulu = dto.Hulu,
                AppleTV = dto.AppleTV,
                Peacock = dto.Peacock,
                City = dto.City ?? "Unknown",
                State = dto.State ?? "Unknown",
                Zip = dto.Zip != 0 ? dto.Zip : 99999
            };


            try
            {
                await _movieDbContext.MovieUsers.AddAsync(movieUser);
                await _movieDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to save MovieUserInfo", inner = ex.Message });
            }

            return Ok(new { message = "Account created successfully!" });
        }
    }
}
