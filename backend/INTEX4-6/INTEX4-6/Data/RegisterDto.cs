using System.ComponentModel.DataAnnotations;

namespace INTEX4_6.Data
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        [Range(0, 150, ErrorMessage = "Age must be between 0 and 150.")]
        public int Age { get; set; }

        [Required]
        public string Gender { get; set; }

        public bool Netflix { get; set; }
        public bool AmazonPrime { get; set; }
        public bool DisneyPlus { get; set; }
        public bool Hulu { get; set; }
        public bool Max { get; set; }
        public bool ParamountPlus { get; set; }
        public bool AppleTV { get; set; }
        public bool Peacock { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Zip { get; set; }
    }
}
