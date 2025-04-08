using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class UserRepository : IUserRepositiry
    {
        private readonly IContext _context;

        public UserRepository(IContext context)
        {
            _context = context;
        }

        public User Add(User item)
        {
            item.Role = "User";
            _context.Users.Add(item);
            _context.Save();
            return item;
        }

        public User Get(int id)
        {
            return _context.Users.FirstOrDefault(x=>x.Id == id);
        }

        public List<User> GetAll()
        {
            return _context.Users.ToList();
        }
    }
}
