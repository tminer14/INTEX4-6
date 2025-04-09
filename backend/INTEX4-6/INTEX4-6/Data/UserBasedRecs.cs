using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX4_6.Data;

[Table("UBasedRec")]
public class UserBasedRecs
{
    [Key]
    public string show_id { get; set; }
    public int user_id { get; set; }
    public string recommendation_type { get; set; }
    public string title { get; set; }
    public int rank { get; set; }
}
