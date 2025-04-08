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
    public class OrderItemSrvice : IOrderItemService
    {
        private readonly IRepository<OrderItem> _repository;
        private readonly IMapper _mapper;

        public OrderItemSrvice(IRepository<OrderItem> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public OrderItemDto Add(OrderItemDto item)
        {
            return _mapper.Map<OrderItemDto>(_repository.Add(_mapper.Map<OrderItem>(item)));
        }

        public OrderItemDto Get(int id)
        {
            return _mapper.Map<OrderItemDto>(_repository.Get(id));
        }

        public List<OrderItemDto> GetAll()
        {
            return _mapper.Map<List<OrderItemDto>>(_repository.GetAll());
        }

    }
}
