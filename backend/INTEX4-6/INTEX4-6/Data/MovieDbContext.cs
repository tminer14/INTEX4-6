using Microsoft.EntityFrameworkCore;
using INTEX4_6.Models; // <-- Make sure this is included so it knows what MovieRating is

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
        public DbSet<MovieRating> MovieRatings { get; set; }
        public DbSet<UserBasedRecs> UserBasedRecs { get; set; }
        public DbSet<MovieBasedRecs> MovieBasedRecs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Declare UserBasedRecs as keyless (no primary key in table)
            modelBuilder.Entity<UserBasedRecs>().HasNoKey();

            // 👇 Add this line to define the composite key for MovieRating
            modelBuilder.Entity<MovieRating>()
                .HasKey(r => new { r.UserId, r.ShowId });

            // Add other keyless/table-specific configs here if needed
        }
    }
}
