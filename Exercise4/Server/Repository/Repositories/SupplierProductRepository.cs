using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class SupplierProductRepository:ISupplierProductRepository
    {
        private readonly IContext _context;

        public SupplierProductRepository(IContext context)
        {
            _context = context;
        }

        public SupplierProduct Add(SupplierProduct item)
        {
            _context.SupplierProduct.Add(item);
            _context.Save();
            return item;
        }

        public SupplierProduct Get(int id)
        {
            return _context.SupplierProduct.FirstOrDefault(x => x.Id == id);
        }

        public List<SupplierProduct> GetAll()
        {
           return _context.SupplierProduct.ToList();
        }
        //public SupplierProduct GetProductsBySupplier(int id)
        //{
        //    return _context.SupplierProduct.FirstOrDefault(x => x.SupplierID == id);
        //}
    }
}
