using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IOrderService : IService<OrderDto>
    {
        //List<OrderDto> GetOrdersByUser(int userId);
        List<OrderDto> GetOrdersPending(int userId);
        OrderDto UpdateOrderToCompleted(int id);
        OrderDto UpdateOrderToInProgress(int id);
        List<OrderDto> GetOrderBySupplier(int id);

    }
}
