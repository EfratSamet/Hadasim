using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Dtos;
using Service.Interfaces;

namespace MasterEvents.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            if (loginDto == null || string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
            {
                return BadRequest("Identifier (email/phone) and password are required.");
            }

            var token = _loginService.Authenticate(loginDto.Email, loginDto.Password);
            if (token != null)
            {
                return Ok(new { Token = token });
            }
            return Unauthorized("Invalid credentials");
        }
        [HttpGet("{token}/getRole")]
        public string GetRoleFromToken(string token)
        {
            return _loginService.GetRoleFromToken(token);
        }
    }
}
