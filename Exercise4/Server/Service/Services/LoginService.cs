using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Service.Dtos;
using Service.Interfaces;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Service.Services
{
    public class LoginService : ILoginService
    {
        private readonly IUserService _userService;
        private readonly ISupplierService _supplierService;
        private readonly IConfiguration _config;

        public LoginService(IUserService userService, ISupplierService supplierService, IConfiguration config)
        {
            _userService = userService;
            _supplierService = supplierService;
            _config = config;
        }

        public string GenerateToken(int id, string name, string identifier, string role)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, id.ToString()),
                new Claim(ClaimTypes.Name, name),
                new Claim(ClaimTypes.Email, identifier), // כאן תמיד יהיה אימייל, גם עבור ספקים
                new Claim(ClaimTypes.Role,role), // נכניס את התפקיד ישירות לטוקן
    new Claim("UserId", id.ToString())            };

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(45),
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string Authenticate(string identifier, string password)
        {
            // ניסיון למצוא משתמש רגיל (User) לפי אימייל
            var user = _userService.GetAll().FirstOrDefault(x => x.Email == identifier && x.Password == password);
            if (user != null)
                return GenerateToken(user.Id, user.Name, user.Email, "User");

            // ניסיון למצוא ספק (Supplier) לפי אימייל
            var supplier = _supplierService.GetAll().FirstOrDefault(s => s.Email == identifier && s.Password == password);
            if (supplier != null)
                return GenerateToken(supplier.Id, supplier.RepresentativeName, supplier.Email, "Supplier");

            return null; // התחברות נכשלה
        }
        public string GetRoleFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

            try
            {
                var jsonToken = handler.ReadToken(token) as JwtSecurityToken;
                var roleClaim = jsonToken?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                return roleClaim;
            }
            catch
            {
                return null; // אם לא הצלחנו לפענח את הטוקן
            }
        }
    }
}
