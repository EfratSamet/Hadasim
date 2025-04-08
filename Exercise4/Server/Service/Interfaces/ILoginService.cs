using Service.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{

        public interface ILoginService
        {
        string GenerateToken(int id, string name, string identifier, string role);
        string Authenticate(string identifier, string password);
        string GetRoleFromToken(string token);
    }
    
}
