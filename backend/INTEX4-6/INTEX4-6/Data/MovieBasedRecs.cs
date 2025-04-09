using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX4_6.Data;

[Table("MBasedRec")]
public class MovieBasedRecs
{
    [Key]
    public string title { get; set; }
    public int user_id { get; set; }
    public string show_id { get; set; }
  
}