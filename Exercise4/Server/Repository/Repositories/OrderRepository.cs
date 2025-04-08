using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly IContext _context;

        public OrderRepository(IContext context)
        {
            _context = context;
        }

        public Order Add(Order item)
        {
            _context.Orders.Add(item);
            _context.Save();
            return item;
        }

        public Order Get(int id)
        {
            return _context.Orders.FirstOrDefault(x=>x.Id==id);
        }

        public List<Order> GetAll()
        {
            return _context.Orders.Include(o => o.Products).ThenInclude(oi => oi.Product)

.ToList();
        }
        //public List<Order> GetOrders(int userId)
        //{
        //    return _context.Orders.Where(o => o.UserId == userId).ToList();
        //}
        public List<Order> GetOrdersPending(int userId)
        {
            return _context.Orders.Where(o =>o.Status==Status.PENDING).ToList();
        }
        public Order UpdateOrderToCompleted(int id)
        {
            var existingOrder = _context.Orders.FirstOrDefault(x => x.Id == id);

            if (existingOrder == null)
            {
                throw new Exception("Order not found.");
            }

            existingOrder.Status = Status.COMPLETED;

            _context.Save();

            return existingOrder;
        }
        public List<Order> GetOrderBySupplier(int id)
        {
            return _context.Orders.Where(o => o.SupplierID == id).ToList();
        }
        public Order UpdateOrderToInProgress(int id)
        {
            var existingOrder = _context.Orders.FirstOrDefault(x => x.Id == id);

            if (existingOrder == null)
            {
                throw new Exception("Order not found.");
            }

            existingOrder.Status = Status.IN_PROGRESS;

            _context.Save();

            return existingOrder;
        }
    }
}
