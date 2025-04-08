using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public enum Status
    {
    Pending, In_Progress, Completed
    }
    public class OrderDto
    {
        public int Id { get; set; }
        //public int UserId { get; set; }
        public int SupplierID { get; set; }
        public DateTime OrderDate { get; set; }
        public Status Status { get; set; }
        public List<OrderItemDto> Products;
    }
}
