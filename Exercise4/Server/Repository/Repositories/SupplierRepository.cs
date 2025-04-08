using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class SupplierRepository : ISupplierRepositiry
    {
        private readonly IContext _context;

        public SupplierRepository(IContext context)
        {
            _context = context;
        }

        public Supplier Add(Supplier item)
        {
            item.Role = "Supplier";
            _context.Suppliers.Add(item);
            _context.Save();
            return item;
        }

        public Supplier Get(int id)
        {
            return _context.Suppliers.FirstOrDefault(x=>x.Id==id);
        }

        public List<Supplier> GetAll()
        {
            return _context.Suppliers.ToList();
        }
    }
}
