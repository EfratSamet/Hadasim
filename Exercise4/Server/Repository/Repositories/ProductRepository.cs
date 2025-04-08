using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ProductRepository : IProductRepositiry
    {
        private readonly IContext _context;

        public ProductRepository(IContext context)
        {
            _context = context;
        }

        public Product Add(Product item)
        {
            _context.Products.Add(item);
            _context.Save();
            return item;
        }

        public Product Get(int id)
        {
            return _context.Products.FirstOrDefault(x => x.Id == id);
        }

        public List<Product> GetAll()
        {
           return _context.Products.ToList();
        }
        public List<Product> GetProductsBySupplier(int id)
        {
            return _context.SupplierProduct
                .Where(sp => sp.SupplierID == id)
                .Select(sp => sp.Product)
                .ToList();
        }

    }
}
