using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RegistrationService.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RegistrationService.Data
{
   public class ApplicationDbContext : IdentityDbContext<User>
    {

        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
