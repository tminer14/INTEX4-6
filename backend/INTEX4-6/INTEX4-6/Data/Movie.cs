﻿using System.ComponentModel.DataAnnotations;
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
        public int? ReleaseYear { get; set; }

        [Column("rating")]
        public string? Rating { get; set; }

        [Column("duration")]
        public string? Duration { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        // Genre flags (now using int? instead of bool?)
        [Column("Action")]
        public int? Action { get; set; }

        [Column("Adventure")]
        public int? Adventure { get; set; }

        [Column("Anime Series International TV Shows")]
        public int? AnimeSeriesInternationalTvShows { get; set; }

        [Column("British TV Shows Docuseries International TV Shows")]
        public int? BritishTvShowsDocuseriesInternationalTvShows { get; set; }

        [Column("Children")]
        public int? Children { get; set; }

        [Column("Comedies")]
        public int? Comedies { get; set; }

        [Column("Comedies Dramas International Movies")]
        public int? ComediesDramasInternationalMovies { get; set; }

        [Column("Comedies International Movies")]
        public int? ComediesInternationalMovies { get; set; }

        [Column("Comedies Romantic Movies")]
        public int? ComediesRomanticMovies { get; set; }

        [Column("Crime TV Shows Docuseries")]
        public int? CrimeTvShowsDocuseries { get; set; }

        [Column("Documentaries")]
        public int? Documentaries { get; set; }

        [Column("Documentaries International Movies")]
        public int? DocumentariesInternationalMovies { get; set; }

        [Column("Docuseries")]
        public int? Docuseries { get; set; }

        [Column("Dramas")]
        public int? Dramas { get; set; }

        [Column("Dramas International Movies")]
        public int? DramasInternationalMovies { get; set; }

        [Column("Dramas Romantic Movies")]
        public int? DramasRomanticMovies { get; set; }

        [Column("Family Movies")]
        public int? FamilyMovies { get; set; }

        [Column("Fantasy")]
        public int? Fantasy { get; set; }

        [Column("Horror Movies")]
        public int? HorrorMovies { get; set; }

        [Column("International Movies Thrillers")]
        public int? InternationalMoviesThrillers { get; set; }

        [Column("International TV Shows Romantic TV Shows TV Dramas")]
        public int? InternationalTvShowsRomanticTvShowsTvDramas { get; set; }

        [Column("Kids' TV")]
        public int? KidsTv { get; set; }

        [Column("Language TV Shows")]
        public int? LanguageTvShows { get; set; }

        [Column("Musicals")]
        public int? Musicals { get; set; }

        [Column("Nature TV")]
        public int? NatureTv { get; set; }

        [Column("Reality TV")]
        public int? RealityTv { get; set; }

        [Column("Spirituality")]
        public int? Spirituality { get; set; }

        [Column("TV Action")]
        public int? TvAction { get; set; }

        [Column("TV Comedies")]
        public int? TvComedies { get; set; }

        [Column("TV Dramas")]
        public int? TvDramas { get; set; }

        [Column("Talk Shows TV Comedies")]
        public int? TalkShowsTvComedies { get; set; }

        [Column("Thrillers")]

        public int? Thrillers { get; set; }

        // Link to TopOverallRecs table
        public ICollection<TopOverallRecs>? TopOverallRecs { get; set; }
    }
}

