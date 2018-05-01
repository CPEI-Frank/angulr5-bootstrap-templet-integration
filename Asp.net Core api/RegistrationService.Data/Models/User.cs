using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RegistrationService.Data.Models
{
    public class User : IdentityUser
    {
        [Column(TypeName = "varchar(100)")]
        public string FirstName { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public User() { }
    }
}
