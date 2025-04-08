using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX4_6.Data
{
    [Table("movies_titles")]
    public class Movie
    {

        [Key]
        [Column("show_id")]
        public string ShowId { get; set; }

        [Column("type")]
        public string? Type { get; set; }

        [Column("title")]
        public string? Title { get; set; }

        [Column("director")]
        public string? Director { get; set; }

        [Column("cast")]
        public string? Cast { get; set; }

        [Column("country")]
        public string? Country { get; set; }

        [Column("release_year")]
        public string? ReleaseYear { get; set; }

        [Column("rating")]
        public string? Rating { get; set; }

        [Column("duration")]
        public string? Duration { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        // Genre flags (Capitalized column names)
        [Column("Action")]
        public bool? Action { get; set; }

        [Column("Adventure")]
        public bool? Adventure { get; set; }

        [Column("Anime Series International TV Shows")]
        public bool? AnimeSeriesInternationalTvShows { get; set; }

        [Column("British TV Shows Docuseries International TV Shows")]
        public bool? BritishTvShowsDocuseriesInternationalTvShows { get; set; }

        [Column("Children")]
        public bool? Children { get; set; }

        [Column("Comedies")]
        public bool? Comedies { get; set; }

        [Column("Comedies Dramas International Movies")]
        public bool? ComediesDramasInternationalMovies { get; set; }

        [Column("Comedies International Movies")]
        public bool? ComediesInternationalMovies { get; set; }

        [Column("Comedies Romantic Movies")]
        public bool? ComediesRomanticMovies { get; set; }

        [Column("Crime TV Shows Docuseries")]
        public bool? CrimeTvShowsDocuseries { get; set; }

        [Column("Documentaries")]
        public bool? Documentaries { get; set; }

        [Column("Documentaries International Movies")]
        public bool? DocumentariesInternationalMovies { get; set; }

        [Column("Docuseries")]
        public bool? Docuseries { get; set; }

        [Column("Dramas")]
        public bool? Dramas { get; set; }

        [Column("Dramas International Movies")]
        public bool? DramasInternationalMovies { get; set; }

        [Column("Dramas Romantic Movies")]
        public bool? DramasRomanticMovies { get; set; }

        [Column("Family Movies")]
        public bool? FamilyMovies { get; set; }

        [Column("Fantasy")]
        public bool? Fantasy { get; set; }

        [Column("Horror Movies")]
        public bool? HorrorMovies { get; set; }

        [Column("International Movies Thrillers")]
        public bool? InternationalMoviesThrillers { get; set; }

        [Column("International TV Shows Romantic TV Shows TV Dramas")]
        public bool? InternationalTvShowsRomanticTvShowsTvDramas { get; set; }

        [Column("Kids' TV")]
        public bool? KidsTv { get; set; }

        [Column("Language TV Shows")]
        public bool? LanguageTvShows { get; set; }

        [Column("Musicals")]
        public bool? Musicals { get; set; }

        [Column("Nature TV")]
        public bool? NatureTv { get; set; }

        [Column("Reality TV")]
        public bool? RealityTv { get; set; }

        [Column("Spirituality")]
        public bool? Spirituality { get; set; }

        [Column("TV Action")]
        public bool? TvAction { get; set; }

        [Column("TV Comedies")]
        public bool? TvComedies { get; set; }

        [Column("TV Dramas")]
        public bool? TvDramas { get; set; }

        [Column("Talk Shows TV Comedies")]
        public bool? TalkShowsTvComedies { get; set; }

        [Column("Thrillers")]
        public bool? Thrillers { get; set; }
        
        // Link to TopOverallRecs table
        public ICollection<TopOverallRecs> TopOverallRecs { get; set; }

    }
    
    
}
