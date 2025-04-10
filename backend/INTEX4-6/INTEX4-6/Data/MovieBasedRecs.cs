using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX4_6.Data;

[Table("MBasedRec")]
public class MovieBasedRecs
{
    [Key]
    public string show_id { get; set; }
    public string title { get; set; }
    public string source_show_id { get; set; }
  
}