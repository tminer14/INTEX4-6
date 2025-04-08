using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX4_6.Data
{
    public class MovieDto
    {

        public string ShowId { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }

        public string Director { get; set; }
        public string Cast { get; set; }
        public string Country { get; set; }
        public string ReleaseYear { get; set; }
        public string Rating { get; set; }
        public string Duration { get; set; }
        public string Description { get; set; }
        public List<string> Genre { get; set; }
    }
}
