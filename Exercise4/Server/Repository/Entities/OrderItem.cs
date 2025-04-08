using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class OrderItem
    {
        public int ID { get; set; }
        [ForeignKey("OrderID")]
        public int OrderID { get; set; }
        public virtual Order Order { get; set; }
        [ForeignKey("ProductID")]
        public int ProductID { get; set; }
        public virtual Product Product { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
    }
}
