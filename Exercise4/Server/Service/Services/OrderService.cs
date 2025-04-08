using AutoMapper;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Logging;
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
    class OrderService : IOrderService
    {
        private readonly IOrderRepository _repository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public OrderDto Add(OrderDto item)
        {
            return _mapper.Map<OrderDto>(_repository.Add(_mapper.Map<Order>(item)));
        }

        public OrderDto Get(int id)
        {
            return _mapper.Map<OrderDto>(_repository.Get(id));
        }

        public List<OrderDto> GetAll()
        {
            return _mapper.Map<List<OrderDto>>(_repository.GetAll());
        }
        //public List<OrderDto> GetOrdersByUser(int userId)
        //{
        //    return _mapper.Map<List<OrderDto>>(_repository.GetOrdersByUser(userId));
        //}
        public List<OrderDto> GetOrdersPending(int userId)
        {
            return _mapper.Map<List<OrderDto>>(_repository.GetOrdersPending(userId));
        }
        public OrderDto UpdateOrderToCompleted(int id)
        {
            return _mapper.Map<OrderDto>(_repository.UpdateOrderToCompleted(id));
        }
        public OrderDto UpdateOrderToInProgress(int id)
        {
            return _mapper.Map<OrderDto>(_repository.UpdateOrderToInProgress(id));
        }
        public List<OrderDto> GetOrderBySupplier(int id)
        {
            return _mapper.Map<List<OrderDto>>(_repository.GetOrderBySupplier(id));
        }


    } 
}
