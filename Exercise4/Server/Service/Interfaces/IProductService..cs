using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IProductService : IService<ProductDto>
    {
        List<ProductDto> GetProductsBySupplier(int id);
    }
}
