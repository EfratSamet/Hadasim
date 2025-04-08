using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IProductRepositiry : IRepository<Product>
    {
        List<Product> GetProductsBySupplier(int id);
    }
}
