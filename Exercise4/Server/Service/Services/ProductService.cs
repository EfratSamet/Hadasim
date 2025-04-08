using AutoMapper;
using Repository.Entities;
using Repository.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ProductService:IProductService
    {
        private readonly IProductRepositiry _repository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepositiry repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public ProductDto Add(ProductDto item)
        {
            return _mapper.Map<ProductDto>(_repository.Add(_mapper.Map<Product>(item)));
        }

        public ProductDto Get(int id)
        {
            return _mapper.Map<ProductDto>(_repository.Get(id));
        }

        public List<ProductDto> GetAll()
        {
            return _mapper.Map<List<ProductDto>>(_repository.GetAll());
        }
        public List<ProductDto> GetProductsBySupplier(int id)
        {
            return _mapper.Map<List<ProductDto>>(_repository.GetProductsBySupplier(id));
        }
    }
}
