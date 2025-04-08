using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace INTEX4_6.Migrations.MovieDb
{
    /// <inheritdoc />
    public partial class MakeEmailUniqueInMovieUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IdentityUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityUser", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "movies_titles",
                columns: table => new
                {
                    show_id = table.Column<string>(type: "TEXT", nullable: false),
                    type = table.Column<string>(type: "TEXT", nullable: true),
                    title = table.Column<string>(type: "TEXT", nullable: true),
                    director = table.Column<string>(type: "TEXT", nullable: true),
                    cast = table.Column<string>(type: "TEXT", nullable: true),
                    country = table.Column<string>(type: "TEXT", nullable: true),
                    release_year = table.Column<string>(type: "TEXT", nullable: true),
                    rating = table.Column<string>(type: "TEXT", nullable: true),
                    duration = table.Column<string>(type: "TEXT", nullable: true),
                    description = table.Column<string>(type: "TEXT", nullable: true),
                    Action = table.Column<bool>(type: "INTEGER", nullable: true),
                    Adventure = table.Column<bool>(type: "INTEGER", nullable: true),
                    AnimeSeriesInternationalTVShows = table.Column<bool>(name: "Anime Series International TV Shows", type: "INTEGER", nullable: true),
                    BritishTVShowsDocuseriesInternationalTVShows = table.Column<bool>(name: "British TV Shows Docuseries International TV Shows", type: "INTEGER", nullable: true),
                    Children = table.Column<bool>(type: "INTEGER", nullable: true),
                    Comedies = table.Column<bool>(type: "INTEGER", nullable: true),
                    ComediesDramasInternationalMovies = table.Column<bool>(name: "Comedies Dramas International Movies", type: "INTEGER", nullable: true),
                    ComediesInternationalMovies = table.Column<bool>(name: "Comedies International Movies", type: "INTEGER", nullable: true),
                    ComediesRomanticMovies = table.Column<bool>(name: "Comedies Romantic Movies", type: "INTEGER", nullable: true),
                    CrimeTVShowsDocuseries = table.Column<bool>(name: "Crime TV Shows Docuseries", type: "INTEGER", nullable: true),
                    Documentaries = table.Column<bool>(type: "INTEGER", nullable: true),
                    DocumentariesInternationalMovies = table.Column<bool>(name: "Documentaries International Movies", type: "INTEGER", nullable: true),
                    Docuseries = table.Column<bool>(type: "INTEGER", nullable: true),
                    Dramas = table.Column<bool>(type: "INTEGER", nullable: true),
                    DramasInternationalMovies = table.Column<bool>(name: "Dramas International Movies", type: "INTEGER", nullable: true),
                    DramasRomanticMovies = table.Column<bool>(name: "Dramas Romantic Movies", type: "INTEGER", nullable: true),
                    FamilyMovies = table.Column<bool>(name: "Family Movies", type: "INTEGER", nullable: true),
                    Fantasy = table.Column<bool>(type: "INTEGER", nullable: true),
                    HorrorMovies = table.Column<bool>(name: "Horror Movies", type: "INTEGER", nullable: true),
                    InternationalMoviesThrillers = table.Column<bool>(name: "International Movies Thrillers", type: "INTEGER", nullable: true),
                    InternationalTVShowsRomanticTVShowsTVDramas = table.Column<bool>(name: "International TV Shows Romantic TV Shows TV Dramas", type: "INTEGER", nullable: true),
                    KidsTV = table.Column<bool>(name: "Kids' TV", type: "INTEGER", nullable: true),
                    LanguageTVShows = table.Column<bool>(name: "Language TV Shows", type: "INTEGER", nullable: true),
                    Musicals = table.Column<bool>(type: "INTEGER", nullable: true),
                    NatureTV = table.Column<bool>(name: "Nature TV", type: "INTEGER", nullable: true),
                    RealityTV = table.Column<bool>(name: "Reality TV", type: "INTEGER", nullable: true),
                    Spirituality = table.Column<bool>(type: "INTEGER", nullable: true),
                    TVAction = table.Column<bool>(name: "TV Action", type: "INTEGER", nullable: true),
                    TVComedies = table.Column<bool>(name: "TV Comedies", type: "INTEGER", nullable: true),
                    TVDramas = table.Column<bool>(name: "TV Dramas", type: "INTEGER", nullable: true),
                    TalkShowsTVComedies = table.Column<bool>(name: "Talk Shows TV Comedies", type: "INTEGER", nullable: true),
                    Thrillers = table.Column<bool>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movies_titles", x => x.show_id);
                });

            migrationBuilder.CreateTable(
                name: "movies_users",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IdentityUserId = table.Column<string>(type: "TEXT", nullable: false),
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    phone = table.Column<string>(type: "TEXT", nullable: false),
                    email = table.Column<string>(type: "TEXT", nullable: false),
                    age = table.Column<int>(type: "INTEGER", nullable: false),
                    gender = table.Column<string>(type: "TEXT", nullable: false),
                    Netflix = table.Column<bool>(type: "INTEGER", nullable: false),
                    AmazonPrime = table.Column<bool>(name: "Amazon Prime", type: "INTEGER", nullable: false),
                    Disney = table.Column<bool>(name: "Disney+", type: "INTEGER", nullable: false),
                    Paramount = table.Column<bool>(name: "Paramount+", type: "INTEGER", nullable: false),
                    Max = table.Column<bool>(type: "INTEGER", nullable: false),
                    Hulu = table.Column<bool>(type: "INTEGER", nullable: false),
                    AppleTV = table.Column<bool>(name: "Apple TV+", type: "INTEGER", nullable: false),
                    Peacock = table.Column<bool>(type: "INTEGER", nullable: false),
                    city = table.Column<string>(type: "TEXT", nullable: false),
                    state = table.Column<string>(type: "TEXT", nullable: false),
                    zip = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movies_users", x => x.user_id);
                    table.ForeignKey(
                        name: "FK_movies_users_IdentityUser_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "IdentityUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_movies_users_IdentityUserId",
                table: "movies_users",
                column: "IdentityUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "movies_titles");

            migrationBuilder.DropTable(
                name: "movies_users");

            migrationBuilder.DropTable(
                name: "IdentityUser");
        }
    }
}
