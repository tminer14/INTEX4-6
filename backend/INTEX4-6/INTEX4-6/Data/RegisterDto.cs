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

        public int Netflix { get; set; }
        public int AmazonPrime { get; set; }
        public int DisneyPlus { get; set; }
        public int Hulu { get; set; }
        public int Max { get; set; }
        public int ParamountPlus { get; set; }
        public int AppleTV { get; set; }
        public int Peacock { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public int Zip { get; set; }
    }
}
