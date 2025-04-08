using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class SupplierProduct
    {
        public int Id { get; set; }
        [ForeignKey("SupplierID")]
        public int SupplierID { get; set; }
        public virtual Supplier Supplier { get; set; }
        [ForeignKey("ProductID")]
        public int ProductID { get; set; }
        public virtual Product Product { get; set; }
    }
}
