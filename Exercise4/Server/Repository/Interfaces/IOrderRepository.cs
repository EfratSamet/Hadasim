using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IOrderRepository : IRepository<Order>
    {
        //List<Order> GetOrdersByUser(int userId);
        List<Order> GetOrdersPending(int userId);
        Order UpdateOrderToCompleted(int id);
        List<Order> GetOrderBySupplier(int id);
        Order UpdateOrderToInProgress(int id);
    }
}
