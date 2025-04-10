using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace INTEX4_6.Data
{
    [Keyless]
    [Table("UBasedRec")]
    public class UserBasedRecs
    {
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("recommendation_type")]
        public string RecommendationType { get; set; }

        [Column("show_id")]
        public string ShowId { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("rank")]
        public int? Rank { get; set; }  // nullable, since SQL says "null"
    }
}
