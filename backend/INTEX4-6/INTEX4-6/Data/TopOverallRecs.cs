using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX4_6.Data
{
    [Table("TopOverallRecs")]
    public class TopOverallRecs
    {
        [Key]
        [Column("show_id")]
        public string ShowId { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("avg_rating")]
        public double? AvgRating { get; set; }

        [Column("num_ratings")]
        public long? NumRatings { get; set; }

        [ForeignKey("ShowId")]
        public Movie Movie { get; set; }
    }

}