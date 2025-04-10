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
    public DbSet<MovieBasedRecs> MovieBasedRecs { get; set; }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieUserInfo> MovieUsers { get; set; }
        public DbSet<TopOverallRecs> TopOverallRecs { get; set; }
        public DbSet<UserBasedRecs> UserBasedRecs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 👇 Declare UserBasedRecs as keyless (no primary key in table)
            modelBuilder.Entity<UserBasedRecs>().HasNoKey();

            // Optional: if you have other keyless entities or config
            // modelBuilder.Entity<OtherThing>().HasNoKey();
        }
    }
}
