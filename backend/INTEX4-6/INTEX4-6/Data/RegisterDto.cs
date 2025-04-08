using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Eventing.Reader;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace INTEX4_6.Data
{
   
    public class RegisterDto
    {
        public string Email { get; set; }
        public string Password { get; set; } // Identity uses this
        public string Name { get; set; }
        public string Phone { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public bool Netflix { get; set; }
        public bool AmazonPrime { get; set; }
        public bool DisneyPlus { get; set; }
        public bool Hulu { get; set; }
        public bool Max { get; set; }
        public bool ParamountPlus { get; set; }
        public bool AppleTV { get; set; }
        public bool Peacock { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }


    }
}
