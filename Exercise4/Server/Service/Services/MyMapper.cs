using AutoMapper;
using Repository.Entities;
using Service.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Service.Services
{
    public class MyMapper:Profile
    {
        public MyMapper()
        {

            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<OrderItem, OrderItemDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Supplier, SupplierDto>().ReverseMap();
            CreateMap<SupplierProduct, SupplierProductDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();

        }
    }
}
