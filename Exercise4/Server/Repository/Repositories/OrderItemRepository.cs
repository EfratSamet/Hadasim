using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class OrderItemRepository : IOrderItemRepositiry
    {
        private readonly IContext _context;

        public OrderItemRepository(IContext context)
        {
            _context = context;
        }

        public OrderItem Add(OrderItem item)
        {
            _context.OrderItems.Add(item);
            _context.Save();
            return item;
        }

        public OrderItem Get(int id)
        {
            return _context.OrderItems.FirstOrDefault(x=>x.ID==id);
        }

        public List<OrderItem> GetAll()
        {
            return _context.OrderItems.ToList();
        }
    }
}
