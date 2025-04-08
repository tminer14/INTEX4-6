using Microsoft.EntityFrameworkCore;

namespace INTEX4_6.Data
{
    public class MovieDbContext : DbContext
    {

        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {
        }
    public DbSet<Movie> Movies { get; set; }
    public DbSet<MovieUserInfo> MovieUsers { get; set; }
    public DbSet<TopOverallRecs> TopOverallRecs { get; set; }
    
    public DbSet<UserBasedRecs> UserBasedRecs {get; set; }

    }
}
