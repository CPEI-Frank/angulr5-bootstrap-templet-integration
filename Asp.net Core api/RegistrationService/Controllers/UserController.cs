using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RegistrationService.Data.Models;
using RegistrationService.Models;

namespace RegistrationService.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppSettings _appSetting;

        public UserController(SignInManager<User> signInManager, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IOptions<AppSettings> appSetting

            )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _appSetting = appSetting.Value;

        }
        ResponseResult responseResult = new ResponseResult();
        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        [DisableCors]
        public async Task<IActionResult> LoginAsync([FromBody]UserModel userModel)
        {
            if (userModel.Email != null || userModel.Password != null)
            {
                try
                {
                    var result = await _signInManager.PasswordSignInAsync(userModel.Username, userModel.Password,
                        true, lockoutOnFailure: false);
                    if (result.Succeeded)
                    {
                        var user = await _userManager.FindByEmailAsync(userModel.Username);

                        var tokenHandler = new JwtSecurityTokenHandler();
                        var key = Encoding.ASCII.GetBytes(_appSetting.SecretKey);
                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new ClaimsIdentity(new Claim[]
                            {
                                new Claim(ClaimTypes.Name, user.Id.ToString())
                            }),
                            Expires = DateTime.UtcNow.AddMinutes(60),
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                                SecurityAlgorithms.HmacSha256Signature)
                        };
                        var token = tokenHandler.CreateToken(tokenDescriptor);
                        var tokenString = tokenHandler.WriteToken(token);
                        responseResult.Value = new
                        {
                            user.Id,
                            user.UserName,
                            user.FirstName,
                            user.LastName,
                            user.Email,
                            tokenString
                        };
                        return Ok(responseResult);
                    }
                    responseResult.Status = false;
                    responseResult.Message = "Invalid username or password.";
                    return Ok(responseResult);
                }
                catch (Exception ex)
                {

                }
            }
            responseResult.Status = false;
            responseResult.Message = "Username and Password required";
            return Ok(responseResult);
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IActionResult> RegisterAsync([FromBody]UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                responseResult.Status = false;
                return Ok(responseResult);
            }
            var user = new User
            {
                UserName = userModel.Email,
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                DateOfBirth = userModel.DateOfBirth,
            };
            var existUser = await _userManager.FindByEmailAsync(userModel.Email);
            if (existUser != null)
            {
                responseResult.Status = false;
                responseResult.Message = "Email already exist.";
                return Ok(responseResult);
            }
            var result = await _userManager.CreateAsync(user, userModel.Password);
            if (result.Succeeded)
            {
                // await _userManager.AddToRoleAsync(user, "Admin");             
                // var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                //var callbackUrl = Url.Action(
                //    action: nameof(ConfirmEmail),
                //    controller: "Account",
                //    values: new { user.Id, code },
                //    protocol: Request.Scheme);
                //string emailBody = $"Hi,<br/> <br/>Please confirm your account by clicking this link: <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'> Click here</a>";
                //await _emailSender.SendEmailAsync(userModel.Email, "Email confirmation", emailBody);

                responseResult.Message = "User created successfully.";
                return Ok(responseResult);
            }
            responseResult.Status = false;
            responseResult.Message = result.Errors.FirstOrDefault().Description;
            return Ok(responseResult);
        }
        [HttpGet]
        [Route("GetUsers")]
        [Authorize]
        public IActionResult GetUsers()
        {

            var user = _userManager.Users.Select(s => new
            {
                s.FirstName,
                s.LastName,
                s.Email,
                s.UserName
            }).ToList();
            return Ok(user);
        }
    }
}