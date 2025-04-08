using INTEX4_6.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace INTEX4_6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly MovieDbContext _movieDbContext;

        public AccountController(UserManager<IdentityUser> userManager, MovieDbContext movieDbContext)
        {
            _userManager = userManager;
            _movieDbContext = movieDbContext;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Create the Identity user
            var identityUser = new IdentityUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                PhoneNumber = dto.Phone
            };

            var result = await _userManager.CreateAsync(identityUser, dto.password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            // Save to custom MovieUserInfo table
            var movieUser = new MovieUserInfo
            {
                IdentityUserId = identityUser.Id,
                Name = dto.Name,
                Phone = dto.Phone,
                Email = dto.Email,
                Age = dto.Age,
                Gender = dto.Gender,
                Netflix = dto.Netflix,
                AmazonPrime = dto.AmazonPrime,
                DisneyPlus = dto.DisneyPlus,
                ParamountPlus = dto.ParamountPlus,
                Max = dto.Max,
                Hulu = dto.Hulu,
                AppleTV = dto.AppleTV,
                Peacock = dto.Peacock,
                City = dto.City,
                State = dto.State,
                Zip = dto.Zip
            };

            _movieDbContext.MovieUsers.Add(movieUser);
            await _movieDbContext.SaveChangesAsync();

            return Ok(new { message = "User registered successfully." });
        }

    }
}
