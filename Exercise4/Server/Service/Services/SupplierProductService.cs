using AutoMapper;
using Repository.Entities;
using Repository.Interfaces;
using Service.Dtos;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class SupplierProductService:ISupplierProductService
    {
        private readonly IRepository<SupplierProduct> _repository;
        private readonly IMapper _mapper;

        public SupplierProductService(IRepository<SupplierProduct> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public SupplierProductDto Add(SupplierProductDto item)
        {
            return _mapper.Map<SupplierProductDto>(_repository.Add(_mapper.Map<SupplierProduct>(item)));
        }

        public SupplierProductDto Get(int id)
        {
            return _mapper.Map<SupplierProductDto>(_repository.Get(id));
        }

        public List<SupplierProductDto> GetAll()
        {
            return _mapper.Map<List<SupplierProductDto>>(_repository.GetAll());
        }
    }
}
